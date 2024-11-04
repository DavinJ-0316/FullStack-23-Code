using DavinAssignement3.Model;
using System.ComponentModel.DataAnnotations;

namespace DavinAssignment3.ViewModel
{
    public class CategoryOutput : BaseModal
    {
        [Required]
        public string? CategoryName { get; set; }

        [Required]
        public string? CategoryLevel { get; set; }
    }
}
