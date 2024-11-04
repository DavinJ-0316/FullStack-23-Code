using DavinAssignement3.Enum;
using DavinAssignement3.Model;
using System.Text.Json.Serialization;

namespace DavinAssignement3.ViewModel
{
    public class UserOutput : BaseModal
    {
        public string? UserName { get; set; }

        public string? Email { get; set; }

        public string? Address { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Gender Gender { get; set; }

        public string? Phone { get; set; }
    }
}
