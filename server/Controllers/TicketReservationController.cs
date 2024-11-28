using Microsoft.AspNetCore.Mvc;
using Ticket_Reservation_System_Server.Models;
using Ticket_Reservation_System_Server.Services;

namespace Ticket_Reservation_System_Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TicketReservationController: ControllerBase
    {


        private readonly ITicketReservationService _ticketReservationService;


        public TicketReservationController(ITicketReservationService ticketReservationService)
        {
            _ticketReservationService = ticketReservationService;
        }


        // GET: api/TicketReservation
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var reservation = await _ticketReservationService.GetAllAsyc();
            return Ok(reservation);
        }

        // GET api/TicketReservation/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var reservation = await _ticketReservationService.GetById(id);
            if (reservation == null)
            {
                return NotFound();
            }
            return Ok(reservation);
        }

        // POST api/TicketReservation
        [HttpPost]
        public async Task<IActionResult> Post(TicketReservation ticketReservation)
        {
            var success = await _ticketReservationService.CreateAsync(ticketReservation);

            if (success)
            {
                return Ok("Reservation created successfully");
            }
            else
            {
                return BadRequest("Maximum reservations reached");
            }
        }
    

       [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, [FromBody] TicketReservation newTicketReservation)
    {
        var reservation = await _ticketReservationService.GetById(id);
        if (reservation == null)
            return NotFound();

        // Calculate the number of days remaining until the reservation date
        var today = DateTime.Now.Date;
        var reservationDate = reservation.ReservationDate.Date; // Assuming ReservationDate is a DateTime property

        var daysRemaining = (reservationDate - today).TotalDays;

        // Check if there are at least 5 days remaining
        if (daysRemaining >= 5)
        {
            await _ticketReservationService.UpdateAsync(id, newTicketReservation);
            return Ok("Reservation updated successfully");
        }
        else
        {
            return BadRequest("Reservation can only be updated at least 5 days before the reservation date.");
        }
    }


        // DELETE api/TicketReservation/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var reservation = await _ticketReservationService.GetById(id);
            if (reservation == null)
                return NotFound();

            // Calculate the difference in days between the current date and the reservation date
            var currentDate = DateTime.Now.Date; // Get the current date (without time)
            var reservationDate = reservation.ReservationDate.Date; // Get the reservation date (without time)
            var daysUntilReservation = (int)(reservationDate - currentDate).TotalDays;

            if (daysUntilReservation >= 5)
            {
                // Allow the reservation to be canceled
                await _ticketReservationService.DeleteAysnc(id);
                return Ok("Reservation canceled successfully");
            }
            else
            {
                return BadRequest("Reservation cannot be canceled as it is within 5 days of the reservation date.");
            }
        }



    }
}
