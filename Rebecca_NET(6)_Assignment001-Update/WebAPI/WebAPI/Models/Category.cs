using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Category : BaseModel
    {
        public string CategoryName { get; set; }
        public string CategoryLevel { get; set; }
        public int? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public virtual Category? ParentCategory { get; set; }

        public virtual ICollection<Category> SubCategories { get; set; } = new List<Category>();

        public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}
