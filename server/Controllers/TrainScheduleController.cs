using Microsoft.AspNetCore.Mvc;
using Ticket_Reservation_System_Server.Models;
using Ticket_Reservation_System_Server.Services;

namespace Ticket_Reservation_System_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainScheduleController:ControllerBase
    {
        private readonly ITrainScheduleService _trainScheduleService;

        public TrainScheduleController(ITrainScheduleService trainscheduleservice)
        {
            _trainScheduleService = trainscheduleservice;
        }

        [HttpPost]
        public IActionResult CreateTrainSchedule([FromBody] TrainSchedule trainSchedule)
        {
            _trainScheduleService.CreateAsync(trainSchedule);
            return Ok("Train schedule created.");
        }

        [HttpPost("publish/{trainId}")]
        public IActionResult PublishTrainSchedule(string trainId)
        {
            _trainScheduleService.PublishTrainSchedule(trainId);
            return Ok("Train schedule published.");
        }


        // GET: api/TrainSchedule
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var reservation = await _trainScheduleService.GetAllAsyc();
            return Ok(reservation);
        }

        // GET api/TicketReservation/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var schedule = await _trainScheduleService.GetById(id);
            if (schedule == null)
            {
                return NotFound();
            }
            return Ok(schedule);
        }

        // PUT api/TrainSchedule/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] TrainSchedule newTrainSchedule)
        {
            var Traveler = await _trainScheduleService.GetById(id);
            if (Traveler == null)
                return NotFound();
            await _trainScheduleService.UpdateAsync(id, newTrainSchedule);
            return Ok("updated successfully");
        }

        // DELETE api/Traveler/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var schedule = await _trainScheduleService.GetById(id);
            if (schedule == null)
                return NotFound();
            await _trainScheduleService.DeleteAysnc(id);
            return Ok("deleted successfully");
        }

        [HttpGet("{departure}/{destination}")]
        public async Task<IActionResult> Get(string departure, string destination)
        {
            var schedule = await _trainScheduleService.GetByReservation(departure, destination);

            if (schedule == null)
            {
                return NotFound("No train schedule found for the given departure and destination.");
            }

            return Ok(schedule);
        }

        [HttpPost("reserve/{id}")]
        public async Task<IActionResult> ActivateAccount(string id)
        {
            await _trainScheduleService.ReserveAsync(id);
            return Ok("Train Reserved");
        }






    }
}
