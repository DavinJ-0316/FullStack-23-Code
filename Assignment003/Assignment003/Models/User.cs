using Assignment003.Enum;
using Assignment003.ViewModels;
using System.ComponentModel.DataAnnotations;

namespace Assignment003.Models
{
    public class User:BaseModel
    {
        public string UserName { get; set; }
        public string? Email { get; set; }
        public string Password { get; set; }

        public string? Address { get; set; }

        public Gender Gender { get; set; }
        public string? Phone { get; set; }
    }
}
