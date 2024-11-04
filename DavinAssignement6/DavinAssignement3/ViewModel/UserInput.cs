using DavinAssignement3.Model;
using DavinAssignement3.Enum;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DavinAssignement3.ViewModel
{
    public class UserInput : BaseModal
    {
        [Required(ErrorMessage = "user name should not be null")]
        public string? UserName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "email format is not correct")]
        public string? Email { get; set; }

        public string? Address { get; set; }

        public Gender Gender { get; set; }

        public string? Password { get; set; }

        [TelephoneValidation]
        public string? Phone { get; set; }
    }

    public class AddUserInput : UserInput
    {

    }

    public class UpdateUserInput : UserInput
    {

    }

    public class DeleteUserInput
    {
        [Required(ErrorMessage = "user id should not be null")]
        public string? Id { get; set; }

        [Required(ErrorMessage = "user name should not be null")]
        public string? UserName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "email format is not correct")]
        public string? Email { get; set; }

        public string? Address { get; set; }

        public Gender Gender { get; set; }

        public string? Password { get; set; }

        [TelephoneValidation]
        public string? Phone { get; set; }
    }

}
