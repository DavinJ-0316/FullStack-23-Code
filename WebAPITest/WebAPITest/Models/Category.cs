using System.ComponentModel.DataAnnotations;

namespace WebAPITest.Models
{
    public class Category: BaseModel
    {

        //[Required]
        //[MaxLength(100)]
        public string CategroyName { get; set; }

        public int CategoryLevel { get; set; }

        public int? ParentId { get; set; }

        public Category? Parent { get; set; }

        public ICollection<Course> Courses { get; set; }
    }
}
