using DavinAssignement3.Model;

namespace DavinAssignment3.Model
{
    public class Category : BaseModal
    {
        public string? CategoryName { get; set; }
        public string? CategoryLevel { get; set; }
        public int? ParentId { get; set; }
        public Category? Parent { get; set;}
        public ICollection<Course> Courses { get; set; }
    }
}
