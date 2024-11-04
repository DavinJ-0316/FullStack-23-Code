using DavinAssignement3.Model;

namespace DavinAssignment3.Model
{
    public class Course : BaseModal
    {
        public string? CourseName { get; set; }
        public string? Description { get; set; }
        public int? CategoryId { get; set; }

        public Category? Category { get; set; }
    }
}
