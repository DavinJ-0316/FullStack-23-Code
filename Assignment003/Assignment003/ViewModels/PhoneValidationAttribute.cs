using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Assignment003.ViewModels
{
    public class PhoneValidationAttribute : ValidationAttribute
    {

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {

            if (value != null)
            {
                var stringValue = value.ToString();

                if (Regex.IsMatch(stringValue, @"^04\d{8}$"))
                {
                    return ValidationResult.Success;
                }
                else
                {
                    return new ValidationResult("phone number is not correct");
                }
            }
            else
            {

                return ValidationResult.Success;
            }
        }
    }
}
