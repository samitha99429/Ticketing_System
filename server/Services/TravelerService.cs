using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Ticket_Reservation_System_Server.Models;

namespace Ticket_Reservation_System_Server.Services
{
    public class TravelerService : ITravelerService
    {

        private readonly IMongoCollection<Traveler> _travelerCollection;
        private readonly IOptions<DbConfiguration> _dbSettings;

        public TravelerService(IOptions<DbConfiguration> dbSettings)
        {
            _dbSettings = dbSettings;
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionURI);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            _travelerCollection = mongoDatabase.GetCollection<Traveler>
                (dbSettings.Value.TravelersCollectionName);
        }




        public async Task<IEnumerable<Traveler>> GetAllAsyc() =>
           await _travelerCollection.Find(_ => true).ToListAsync();

        public async Task<Traveler> GetById(string id) =>
            await _travelerCollection.Find(a => a.Nic == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Traveler traveler) =>
            await _travelerCollection.InsertOneAsync(traveler);

        public async Task UpdateAsync(string id, Traveler traveler) =>
            await _travelerCollection
            .ReplaceOneAsync(a => a.Nic == id, traveler);

        public async Task DeleteAysnc(string id) =>
            await _travelerCollection.DeleteOneAsync(a => a.Nic == id);


        public async Task ActivateAccountAsync(string id)
        {
                var filter = Builders<Traveler>.Filter.Eq(t => t.Nic, id);
                var update = Builders<Traveler>.Update.Set(t => t.IsActive, true);
                await _travelerCollection.UpdateOneAsync(filter, update);
            
        }

        public async Task DeactivateAccountAsync(string id)
        {
           
                var filter = Builders<Traveler>.Filter.Eq(t => t.Nic, id);
                var update = Builders<Traveler>.Update.Set(t => t.IsActive, false);
                await _travelerCollection.UpdateOneAsync(filter, update);
        }
        
        




    }





    }

