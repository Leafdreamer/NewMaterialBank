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

        public MaterialsController(MaterialRepository Materials)
        {
            materials = Materials;
        }

        // GET: api/<MaterialsController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public ActionResult<List<object>> Get(string? type = "m")
        {
            List<Material>? listM = materials.GetAllMaterials();
            List<User>? listU = materials.GetAllUsers();

            if ((type == "m") && !(listM == null || listM.Count == 0))
            {
                return Ok(listM);
            }

            else if ((type == "u") && !(listU == null || listU.Count == 0))
            {
                return Ok(listU);
            }

            else if (type != "m" && type != "u")
            {
                return BadRequest();
            }

            return NoContent();
        }

        // GET api/<MaterialsController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<object> Get(int id, string? type = "m")
        {
            Material? material = materials.GetMaterialById(id);
            User? user = materials.GetUserById(id);

            if ((type == "m") && !(material == null))
            {
                return Ok(material);
            }
            else if (material == null)
            {
                return NotFound();
            }

            if ((type == "u") && !(user == null))
            {
                return Ok(user);
            }
            else if (user == null)
            {
                return NotFound();
            }

            return BadRequest();
        }

        // POST api/<MaterialsController>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<object> Post([FromBody] Material value, string? type = "m")
        {
            if (type == "m")
            {
                try
                {
                    value.ValidateName();
                    value.ValidateType();
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
            else if (type == "u")
            {
                User newUser = value.CreatedBy;
                try
                {
                    newUser.ValidateEmail();
                    newUser.ValidatePassword();

                    materials.AddUser(newUser);

                    return Created("/" + newUser.Id, newUser);
                }
                catch (ArgumentException aex)
                {
                    return BadRequest(aex); 
                }
            }

            return BadRequest();
        }

        // PUT api/<MaterialsController>/5
        [HttpPut("{materialID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Material> Put(int materialID, [FromBody] Material value, int userID)
        {
            User? editor = materials.GetUserById(userID);
            Material? tbu = materials.GetMaterialById(materialID);

            if (editor == null || tbu == null)
            {
                return NotFound();
            }

            string changes = "CHANGELOG: ";

            if (tbu.WarehouseNo != value.WarehouseNo)
            {
                changes = changes + $"WarehouseNo changed from {tbu.WarehouseNo} to {value.WarehouseNo}. ";
            }
            if (tbu.Name != value.Name)
            {
                changes = changes + $"Name changed from {tbu.Name} to {value.Name}. ";
            }
            if (tbu.Type != value.Type)
            {
                changes = changes + $"Type changed from {tbu.Type} to {value.Type}. ";
            }
            if (tbu.Amount != value.Amount)
            {
                changes = changes + $"Amount changed from {tbu.Amount} to {value.Amount}. ";
            }
            if (tbu.Description != value.Description)
            {
                changes = changes + $"Description changed from {tbu.Description} to {value.Description}. ";
            }
            if (tbu.PictureURL != value.PictureURL)
            {
                changes = changes + $"PictureURL changed from {tbu.PictureURL} to {value.PictureURL}. ";
            }

            Log changelog = new Log(changes, editor, DateTime.Now);

            tbu.Changelogs.Add(changelog);
            value.Changelogs = tbu.Changelogs;

            Material? updated = materials.UpdateMaterial(materialID, value);
        
            if (updated == null)
            {
                return NotFound();
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
