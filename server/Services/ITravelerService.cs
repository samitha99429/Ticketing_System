using Ticket_Reservation_System_Server.Models;

namespace Ticket_Reservation_System_Server.Services
{
    public interface ITravelerService
    {
        Task<IEnumerable<Traveler>> GetAllAsyc();
        Task<Traveler> GetById(string id);
        Task CreateAsync(Traveler traveler);
        Task UpdateAsync(string id, Traveler traveler);
        Task DeleteAysnc(string id);

        Task ActivateAccountAsync(String id);

        Task DeactivateAccountAsync(string id);

    }
}
