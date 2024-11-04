using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Course : BaseModel
    {
        public string CourseName { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }
    }
}
