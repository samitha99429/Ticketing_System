using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Ticket_Reservation_System_Server.Models
{
    public class TrainSchedule
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("trainID")]
        public string TrainID { get; set; }

        [BsonElement("trainName")]
        public string TrainName { get; set; }

        [BsonElement("origin")]
        public string Origin { get; set; }

        [BsonElement("destination")]
        public string Destination { get; set; }

        [BsonElement("depatureTime")]
        public string DepatureTime { get; set; }

        [BsonElement("arrivalTime")]
        public string ArrivalTime { get; set; }
        [BsonElement("isActive")]

        public Boolean IsActive { get; set; }

        public Boolean reserve { get; set; }



    }
}
