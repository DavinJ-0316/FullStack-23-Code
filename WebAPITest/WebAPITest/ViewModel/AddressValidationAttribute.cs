using System.ComponentModel.DataAnnotations;

namespace MoocApi.ViewModel
{
    public class AddressValidationAttribute : ValidationAttribute
    {
        public AddressValidationAttribute(int minLength)
        {
            MinLength = minLength;
        }
        public int MinLength { get; set; }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return new ValidationResult("Address is  null");
            }

            var stringValue = value as string;
            if (stringValue == null)
            {
                return new ValidationResult("Type is not correct");
            }

            if (stringValue.Length < MinLength)
            {
                return new ValidationResult("The length is not correct");
            }

            return ValidationResult.Success;
        }

    }
}
