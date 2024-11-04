namespace WebAPI.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string CategoryLevel { get; set; }
        public int? ParentId { get; set; }

        public ICollection<CategoryDto> SubCategories { get; set; } = new List<CategoryDto>();
        public ICollection<CourseDto> Courses { get; set; } = new List<CourseDto>();
    }
}
