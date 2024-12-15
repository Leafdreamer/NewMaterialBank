using Microsoft.AspNetCore.Mvc;
using MaterialsLib;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RESTMaterials.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private UserRepository users;

        public UsersController(UserRepository Users)
        {
            users = Users;
        }

        // GET: api/<MaterialsController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public ActionResult<List<User>> Get()
        {
            List<User>? listU = users.GetAllUsers();

            if (listU.Count == 0)
            {
                return NoContent();
            }

            return Ok(listU);
        }

        // GET api/<MaterialsController>/5
        [HttpGet("email")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<User> Login(string email)
        {
            User? user = users.GetUserByEmail(email);

            if (user == null)
            {
                return NotFound();
            }
            
            return Ok(user);
        }

        // POST api/<MaterialsController>
        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<User> Post([FromBody] User value)
        {
            try
            {
                value.ValidateEmail();
                value.ValidatePassword();

                User newUser = users.AddUser(value);

                return Created("/" + newUser.Id, newUser);
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
    }
}
