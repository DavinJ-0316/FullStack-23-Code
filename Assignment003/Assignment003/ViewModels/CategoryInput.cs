namespace Assignment003.ViewModels
{
    public class BaseCategoryInput
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

    }

    public class AddCategoryInput : BaseCategoryInput
    {

    }
    public class UpdateCategoryInput : BaseCategoryInput
    {
        public int Id { get; set; }
    }
}
