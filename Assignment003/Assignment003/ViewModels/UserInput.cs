using Assignment003.Enum;
using Assignment003.Models;
using System.ComponentModel.DataAnnotations;

namespace Assignment003.ViewModels
{
    public class UserInput:BaseModel
    {
        [Required(ErrorMessage ="User name can't be null")]
        public string  UserName { get; set; }

        [EmailAddress(ErrorMessage ="email format is not correct")]
        public string? Email { get; set; }
        public string Password { get; set; }

        public string? Address { get; set; }

        public Gender Gender { get; set; }

        [PhoneValidation]
        public string? Phone { get; set; }
    }

    public class AddUserInput: UserInput
    {

    }

    public class UpdateUserInput : UserInput
    {

    }
}
