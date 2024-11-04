using WebAPI.DTOs;

namespace WebAPI.IServices
{
    public interface ICourseService
    {
        public Task<CourseDto> AddCourse(CourseDto courseDto);
        public Task<IEnumerable<CourseDto>> GetAllCourses();
        public Task<CourseDto> GetCourseById(int id);
        public Task<CourseDto> UpdateCourse(int id, CourseDto courseDto);
        public Task<CourseDto> DeleteCourse(int id);
    }
}
