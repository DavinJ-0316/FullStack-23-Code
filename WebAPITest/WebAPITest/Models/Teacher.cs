using WebAPITest.Models;
using System.ComponentModel.DataAnnotations;
using MoocApi.ViewModel;

namespace MoocApi.Models
{
    public class Teacher:User
    {
        [Required(ErrorMessage = "teacher name can't be null")]
        public override string? UserName { get; set; }
  
        [EmailAddress]
        public string? Email { get; set; }

        [RegularExpression(@"^(\\(0[1-9]\\)\\s?\\d{4}\\s?\\d{4}|0[1-9]\\s?\\d{4}\\s?\\d{4}|04\\d{2}\\s?\\d{3}\\s?\\d{3})$")]
        public string PhoneNum { get; set; }

        //[Phone]
        [MaxLength(10,ErrorMessage ="max length is 10")]
        public string Description { get; set; }

        [AddressValidation(10)]
        public string Address { get; set; }
    }
}
