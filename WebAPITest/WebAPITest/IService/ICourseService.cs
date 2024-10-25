using WebAPITest.Models;

namespace WebAPITest.IService
{
    public interface ICourseService
    {
        bool AddCourse(Course course);
        List<Course> GetCourse();

        Task<Course> UpdateCourseAsync(Course course);
    }
}
