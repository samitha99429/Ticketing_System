using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Ticket_Reservation_System_Server.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("username")]
        public string UserName { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }
        [BsonElement("userRole")]
        public string Roles { get; set; }
    }
}
