using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Ticket_Reservation_System_Server.Models;

namespace Ticket_Reservation_System_Server.Services
{
    public class TicketReservationService :ITicketReservationService
    {
        private readonly IMongoCollection<TicketReservation> _ticketReservation;
        private readonly IOptions<DbConfiguration> _dbSettings;

        public TicketReservationService(IOptions<DbConfiguration> dbSettings)
        {
            _dbSettings = dbSettings;
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionURI);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            _ticketReservation = mongoDatabase.GetCollection<TicketReservation>
                (dbSettings.Value.TicketReservationCollectionName);
        }

        public async Task<IEnumerable<TicketReservation>> GetAllAsyc() =>
           await _ticketReservation.Find(_ => true).ToListAsync();

        public async Task<TicketReservation> GetById(string id) =>
            await _ticketReservation.Find(a => a.Id == id).FirstOrDefaultAsync();

           public async Task<bool> CreateAsync(TicketReservation ticketReservation)
        {
           
                var maxReservations = 4;
                var existingReservationsCount = await _ticketReservation
                .CountDocumentsAsync(r => r.ReferenceID == ticketReservation.ReferenceID);

                if (existingReservationsCount >= maxReservations)
                {
                    return false; // Maximum reservations reached
                }
                /*
                          // Check if the reservation date is within 30 days from the booking date
                          if ((ticketReservation.ReservationDate - ticketReservation.TripDate).Days > 30)
                          {
                              return false; // Reservation date is not within 30 days
                          }
                */
                await _ticketReservation.InsertOneAsync(ticketReservation);
                return true; // Reservation created successfully

            
        }
        public async Task UpdateAsync(string id, TicketReservation ticketReservation) =>
            await _ticketReservation
            .ReplaceOneAsync(a => a.Id == id, ticketReservation);

        public async Task DeleteAysnc(string id) =>
            await _ticketReservation.DeleteOneAsync(a => a.Id == id);


    }
}
