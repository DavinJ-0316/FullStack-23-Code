using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class User : BaseModel
    {
        [Required(ErrorMessage = "User name is required.")]
        public string Username { get; set; }

        [RegularExpression(
            @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
            ErrorMessage = "Password must be at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
        )]
        public string Password { get; set; }
    }
}
