using System.ComponentModel.DataAnnotations;

namespace WebAPITest.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="User name can't be null")]
        public virtual string? UserName { get; set; }

        [EmailAddress(ErrorMessage ="email address format it not correct")]
        public string? Email { get; set; }

        public string? Address { get; set; }

        public GenderEnum Gender { get; set; }
        public string? Password { get; set; }
        public string? Phone { get; set; }

    }
}
