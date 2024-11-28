using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Ticket_Reservation_System_Server.Models
{
    public class TicketReservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("referenceID")]
        public string ReferenceID { get; set; }

        [BsonElement("time")]
        public DateTime Time { get; set; }

        [BsonElement("reservetrainName")]
        public string ReservetrainName { get; set; }

        [BsonElement("reservetrainID")]
        public string ReservetrainID { get; set; }

        [BsonElement("reservationDate")]
        public DateTime ReservationDate { get; set; }

        [BsonElement("bookingDate")]
        public DateTime BookingDate { get; set; }

        [BsonElement("numberOfTicktes")]
        public int NumberOfTickets { get; set; }

        [BsonElement("departureLocation")]
        public string DepartureLocation { get; set; }

        [BsonElement("destination")]
        public string Destination { get; set; }

       


    }
}
