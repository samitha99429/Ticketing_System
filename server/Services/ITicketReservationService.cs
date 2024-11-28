using Ticket_Reservation_System_Server.Models;

namespace Ticket_Reservation_System_Server.Services
{
    public interface ITicketReservationService
    {
        Task<IEnumerable<TicketReservation>> GetAllAsyc();
        Task<TicketReservation> GetById(string id);
        Task<bool> CreateAsync(TicketReservation ticketReservation);
        Task UpdateAsync(string id, TicketReservation ticketReservation);
        Task DeleteAysnc(string id);


    }
}
