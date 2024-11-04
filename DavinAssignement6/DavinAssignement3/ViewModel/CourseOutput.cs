using DavinAssignement3.Model;
using System.ComponentModel.DataAnnotations;

namespace DavinAssignment3.ViewModel
{
    public class CourseOutput : BaseModal
    {
        [Required]
        public string? CourseName { get; set; }

        public string? Description { get; set; }
    }
}
