using DavinAssignement3.ViewModel;
using DavinAssignement3.Enum;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DavinAssignement3.Model
{
    public class User : BaseModal
    {
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public Gender Gender { get; set; }
        public string? Password { get; set; }
        public string? Phone { get; set; }

    }
}
