using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Ticket_Reservation_System_Server.Models;

namespace Ticket_Reservation_System_Server.Services
{
    public class UserService:IUserService
    {

        private readonly IMongoCollection<User> _userCollection;
        private readonly IOptions<DbConfiguration> _dbSettings;

        
        public UserService(IOptions<DbConfiguration> dbSettings)
        {
            _dbSettings = dbSettings;
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionURI);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            _userCollection = mongoDatabase.GetCollection<User>
                (dbSettings.Value.UserCollectionName);
        }


        public async Task<User> AuthenticateAsync(string username, string password)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(u => u.UserName, username);
                var user = await _userCollection.Find(filter).FirstOrDefaultAsync();

                if (user == null)
                {
                    return null; // User not found
                }

                // Verify the password hash
                if (user.Password == password)
                {
                    return user; // Authentication successful
                }

                return null; // Invalid password
            }
            catch (Exception ex)
            {
                // Handle exceptions here, such as database errors
                throw ex;
            }
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(u => u.Id, id);
                return await _userCollection.Find(filter).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                // Handle exceptions here, such as database errors
                throw ex;
            }
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(u => u.UserName, username);
                return await _userCollection.Find(filter).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                // Handle exceptions here, such as database errors
                throw ex;
            }
        }

        public async Task RegisterAsync(User user, string plainPassword)
        {
            try
            {
                // Assign the plain password directly to the user object
                user.Password = plainPassword;

                await _userCollection.InsertOneAsync(user);
            }
            catch (Exception ex)
            {
                // Handle exceptions here, such as database errors
                throw ex;
            }
        }

        // Secure password hashing functions
        private void CreatePasswordHash(string password, out string passwordHash, out string passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = Convert.ToBase64String(hmac.Key);
                passwordHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password + passwordSalt)));
            }
        }

        private bool VerifyPasswordHash(string password, string storedHash, string storedSalt)
        {
            using (var hmac = new HMACSHA512(Encoding.UTF8.GetBytes(storedSalt)))
            {
                var computedHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
                return storedHash == computedHash;
            }
        }


       



    }
}
