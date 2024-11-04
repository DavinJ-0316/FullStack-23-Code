namespace Assignment003.Models
{
    public class Category : BaseModel
    {

        /// <summary>
        /// CategroyName
        /// </summary>
        public string CategroyName { get; set; }

        /// <summary>
        /// CategoryLevel
        /// </summary>
        public int CategoryLevel { get; set; }

        /// <summary>
        /// ParentId
        /// </summary>
        public int? ParentId { get; set; }

        public Category? Parent { get; set; }

       // public virtual ICollection<Category> Children { get; set; }

        public virtual ICollection<Course> Courses { get; set; }//延迟加载
    }
}
