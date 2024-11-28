using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Ticket_Reservation_System_Server.Models
{
    public class Traveler
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string? Nic { get; set; }

        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [BsonElement("lastName")]
        public string LastName { get; set; }

        [BsonElement("phone")]
        public string Phone { get; set; }

        [BsonElement("country")]
        public string Country { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("dob")]
        public string Dob { get; set; }

        [BsonElement("passwords")]
       
        public string Passwords { get; set; }

        [BsonElement("image")]
        public string Image { get; set; }

        [BsonElement("isActive")]

        public Boolean IsActive { get; set; }













    }
}
