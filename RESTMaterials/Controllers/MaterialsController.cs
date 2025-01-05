using Microsoft.AspNetCore.Mvc;
using MaterialsLib;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RESTMaterials.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialsController : ControllerBase
    {
        private MaterialRepository materials;
        private UserRepository users;

        public MaterialsController(MaterialRepository Materials, UserRepository Users)
        {
            materials = Materials;
            users = Users;
        }

        // GET: api/<MaterialsController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public ActionResult<List<Material>> Get()
        {
            List<Material>? listM = materials.GetAllMaterials();

            if (listM.Count == 0)
            {
                return NoContent();
            }

            return Ok(listM);
        }

        // GET api/<MaterialsController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Material> Get(int id)
        {
            Material? material = materials.GetMaterialById(id);

            if (!(material == null))
            {
                return Ok(material);
            }
            return NotFound();
        }

        // POST api/<MaterialsController>
        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Material> Post([FromBody] Material value)
        {
            try
            {
                value.ValidateName();
                value.ValidateAmount();

                Material newMat = materials.AddMaterial(value);

                return Created("/" + newMat.Id, newMat);
            }
            catch (ArgumentOutOfRangeException aex)
            {
                return BadRequest(aex);
            }
            catch (ArgumentException aex)
            {
                return BadRequest(aex);
            }
        }

        // PUT api/<MaterialsController>/5
        [HttpPut("{materialID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Material> Put(int materialID, [FromBody] Material value, int userID)
        {
            User? editor = users.GetUserById(userID);
            Material? tbu = materials.GetMaterialById(materialID);

            if (editor == null || tbu == null)
            {
                return NotFound();
            }

            string changes = "CHANGELOG: ";

            if (tbu.WarehouseNo != value.WarehouseNo)
            {
                changes = changes + $"WarehouseNo changed from {tbu.WarehouseNo} to {value.WarehouseNo}.{"\n"}";
            }
            if (tbu.Name != value.Name)
            {
                changes = changes + $"Name changed from {tbu.Name} to {value.Name}.{"\n"}";
            }
            if (tbu.Type != value.Type)
            {
                changes = changes + $"Type changed from {tbu.Type} to {value.Type}.{"\n"}";
            }
            if (tbu.Amount != value.Amount)
            {
                changes = changes + $"Amount changed from {tbu.Amount} to {value.Amount}.{"\n"}";
            }
            if (tbu.Description != value.Description)
            {
                changes = changes + $"Description changed from {tbu.Description} to {value.Description}.{"\n"}";
            }
            if (tbu.PictureURL != value.PictureURL)
            {
                changes = changes + $"PictureURL changed from {tbu.PictureURL} to {value.PictureURL}.{"\n"}";
            }

            if (changes == "CHANGELOG: ")
            {
                changes = "No changes.";
                return BadRequest("Material remains unedited.");
            }

            Log changelog = new Log(changes, editor, DateTime.Now);

            tbu.Changelogs.Add(changelog);
            value.Changelogs = tbu.Changelogs;

            Material? updated = materials.UpdateMaterial(materialID, value);
        
            if (updated == null)
            {
                return NotFound("Failed to validate material.");
            }

            return Ok(updated);
        }

        // DELETE api/<MaterialsController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Material> Delete(int id)
        {
            Material? tbd = materials.DeleteMaterial(id);

            if (tbd == null)
            {
                return NotFound();
            }

            return Ok(tbd);
        }
    }
}
