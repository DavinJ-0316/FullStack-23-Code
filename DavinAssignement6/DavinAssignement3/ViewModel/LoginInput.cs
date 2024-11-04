using DavinAssignement3.Enum;
using System.ComponentModel.DataAnnotations;

namespace DavinAssignement3.ViewModel
{
    public class LoginInput
    {
        [Required]
        [EmailAddress(ErrorMessage = "email format is not correct")]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}
