using System.ComponentModel.DataAnnotations;

namespace WebAPITest.Models
{
    public class Category: BaseModel
    {

        //[Required]
        //[MaxLength(100)]

        /// <summary>
        /// 
        /// </summary>
        public string CategroyName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int CategoryLevel { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? ParentId { get; set; }

        public Category? Parent { get; set; }

        public virtual ICollection<Course> Courses { get; set; }//延迟加载
    }
}
