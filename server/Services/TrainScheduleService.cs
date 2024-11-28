using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Ticket_Reservation_System_Server.Models;

namespace Ticket_Reservation_System_Server.Services
{
    public class TrainScheduleService:ITrainScheduleService
    {


        private readonly IMongoCollection<TrainSchedule> _trainscheduleCollection;
        private readonly IOptions<DbConfiguration> _dbSettings;

        public TrainScheduleService(IOptions<DbConfiguration> dbSettings)
        {
            _dbSettings = dbSettings;
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionURI);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            _trainscheduleCollection = mongoDatabase.GetCollection<TrainSchedule>
                (dbSettings.Value.TrainScheduleCollectionName);
        }


        public async Task<IEnumerable<TrainSchedule>> GetAllAsyc() =>
           await _trainscheduleCollection.Find(_ => true).ToListAsync();

        public async Task<TrainSchedule> GetById(string id) =>
            await _trainscheduleCollection.Find(a => a.Id == id).FirstOrDefaultAsync();




        public async Task CreateAsync(TrainSchedule trainschedule) =>
            await _trainscheduleCollection.InsertOneAsync(trainschedule);

        public async Task UpdateAsync(string id, TrainSchedule trainSchedule) =>
            await _trainscheduleCollection
            .ReplaceOneAsync(a => a.Id == id, trainSchedule);

       public async Task PublishTrainSchedule(string trainId)
        {
            var filter = Builders<TrainSchedule>.Filter.Eq(ts => ts.TrainID, trainId);
            var update = Builders<TrainSchedule>.Update.Set(ts => ts.IsActive, true);
            _trainscheduleCollection.UpdateOne(filter, update);
        }

        public async Task DeleteAysnc(string id) =>
            await _trainscheduleCollection.DeleteOneAsync(a => a.Id == id);

        public async Task<IEnumerable<TrainSchedule>> GetByReservation(string depature, string destination) =>
        
            await _trainscheduleCollection.Find(a => a.Origin == depature && a.Destination == destination).ToListAsync();

        public async Task ReserveAsync(string id)
        {
            var filter = Builders<TrainSchedule>.Filter.Eq(t => t.Id, id);
            var update = Builders<TrainSchedule>.Update.Set(t => t.reserve, true);
            await _trainscheduleCollection.UpdateOneAsync(filter, update);
        }
    }

    


}
