using Ticket_Reservation_System_Server.Models;

namespace Ticket_Reservation_System_Server.Services
{
    public interface IUserService
    {
        Task<User> AuthenticateAsync(string username, string password);
        Task<User> GetUserByIdAsync(string id);
        Task<User> GetUserByUsernameAsync(string username);
        Task RegisterAsync(User user, string plainPassword);


    }
}
