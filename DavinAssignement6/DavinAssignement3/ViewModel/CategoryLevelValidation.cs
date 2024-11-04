using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace DavinAssignment3.ViewModel
{
    public class CategoryLevelValidation : ValidationAttribute
    {
        public CategoryLevelValidation() { }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            int level = (int)value;

            if(level != 1 && level != 2)
            {
                return new ValidationResult("Categroy Level must be 1 or 2");
            }

            return ValidationResult.Success;
        }
    }
}
