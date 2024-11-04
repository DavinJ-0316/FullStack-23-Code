using DavinAssignment3.Model;
using DavinAssignment3.ViewModel;

namespace DavinAssignement3.IServices
{
    public interface ICourseService
    {
        bool AddCourse(Course course);

        List<CourseOutput> GetAllCourses();

        List<Course> GetAllCoursesWithCategories();

        Task<Course> UpdateCourseAsync(Course course);
    }
}
