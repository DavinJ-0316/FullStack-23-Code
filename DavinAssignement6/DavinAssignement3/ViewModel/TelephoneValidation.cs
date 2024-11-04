using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace DavinAssignement3.ViewModel
{
    public class TelephoneValidation : ValidationAttribute
    {
        public TelephoneValidation() { }

        protected override ValidationResult? IsValid(object value, ValidationContext validationContext)
        {
            string phone = value as string;

            string pattern = @"^(\(0[2-8]\)\s?\d{4}\s?\d{4}|0[2-8]\s?\d{4}\s?\d{4}|04\d{2}\s?\d{3}\s?\d{3})$";

            if(!Regex.IsMatch(phone, pattern))
            {
                return new ValidationResult("Phone must meet Australia telephone format");

            }

            return ValidationResult.Success;
        }
    }
}
