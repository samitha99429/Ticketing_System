using Microsoft.AspNetCore.Mvc;
using Ticket_Reservation_System_Server.Models;
using Ticket_Reservation_System_Server.Services;

namespace Ticket_Reservation_System_Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TravelerController : ControllerBase
    {


        private readonly ITravelerService _travelerService;


        public TravelerController(ITravelerService TravelerService)
        {
            _travelerService = TravelerService;
        }


        // GET: api/Traveler
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var traveler = await _travelerService.GetAllAsyc();
            return Ok(traveler);
        }

        // GET api/Traveler/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var traveler = await _travelerService.GetById(id);
            if (traveler == null)
            {
                return NotFound();
            }
            return Ok(traveler);
        }

        // POST api/Traveler
        [HttpPost]
        public async Task<IActionResult> Post(Traveler traveler)
        {
            await _travelerService.CreateAsync(traveler);
            return Ok("created successfully");
        }

        // PUT api/Traveler/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Traveler newTraveler)
        {
            var Traveler = await _travelerService.GetById(id);
            if (Traveler == null)
                return NotFound();
            await _travelerService.UpdateAsync(id, newTraveler);
            return Ok("updated successfully");
        }

        // DELETE api/Traveler/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var category = await _travelerService.GetById(id);
            if (category == null)
                return NotFound();
            await _travelerService.DeleteAysnc(id);
            return Ok("deleted successfully");
        }

        [HttpPost("activate/{id}")]
        public async Task<IActionResult> ActivateAccount(string id)
        {
            await _travelerService.ActivateAccountAsync(id);
            return Ok("Activated  successfully");
        }

        [HttpPost("deactivate/{id}")]
        public async Task<IActionResult> DeactivateAccount(string id)
        {
            await _travelerService.DeactivateAccountAsync(id);
            return Ok("Deactivated successfully");
        }

    }








}




