using Microsoft.AspNetCore.Mvc;
using MaterialsLib;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RESTMaterials.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehousesController : ControllerBase
    {
        private WarehouseRepository warehouses;
        private MaterialRepository materials;

        public WarehousesController(WarehouseRepository Warehouses, MaterialRepository Materials)
        {
            warehouses = Warehouses;
            materials = Materials;
        }

        // GET: api/<MaterialsController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public ActionResult<List<Warehouse>> Get()
        {
            List<Warehouse>? listW = warehouses.GetAllWarehouses();

            if (listW.Count == 0)
            {
                return NoContent();
            }

            return Ok(listW);
        }

        // GET api/<MaterialsController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Warehouse> Get(int id)
        {
            Warehouse? warehouse = warehouses.GetWarehouseById(id);

            if (!(warehouse == null))
            {
                return Ok(warehouse);
            }
            return NotFound();
        }

        // POST api/<MaterialsController>
        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Warehouse> Post([FromBody] Warehouse value)
        {
            Warehouse newWar = warehouses.AddWarehouse(value);

            if (newWar == null)
            {
                return BadRequest();
            }

            return Created("/" + newWar.Id, newWar);
        }

        // PUT api/<MaterialsController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Material> Put(int id, [FromBody] Warehouse value)
        {
            Warehouse? tbu = warehouses.GetWarehouseById(id);

            if (tbu == null)
            {
                return NotFound();
            }

            Warehouse? updated = warehouses.UpdateWarehouse(id, value);

            return Ok(updated);
        }

        // DELETE api/<MaterialsController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Warehouse> Delete(int id)
        {
            Warehouse? tbd = warehouses.DeleteWarehouse(id);

            if (tbd == null)
            {
                return NotFound();
            }

            List<Material> test = materials.GetAllMaterials();

            foreach(Material m in test)
            {
                if (m.WarehouseNo == id)
                {
                    materials.DeleteMaterial(m.Id);
                }
            }

            return Ok(tbd);
        }
    }
}
