using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;
using WebAPI.IServices;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class CourseService : ICourseService
    {
        private readonly DBContext _context;

        public CourseService(DBContext dBContext)
        {
            _context = dBContext;
        }

        public async Task<CourseDto> AddCourse(CourseDto courseDto)
        {
            if (await CourseExistsAsync(courseDto))
            {
                throw new Exception($"Course: {courseDto.CourseName} already exists.");
            }

            var course = MapToEntity(courseDto);

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return courseDto;
        }

        public async Task<IEnumerable<CourseDto>> GetAllCourses()
        {
            var courses = await _context.Courses.ToListAsync();

            var courseDtos = courses.Select(MapToDto);

            return courseDtos;
        }

        public async Task<CourseDto> GetCourseById(int id)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                throw new Exception($"Could not find course {id}");
            }

            return MapToDto(course);
        }

        public async Task<CourseDto> UpdateCourse(int id, CourseDto courseDto)
        {
            if (await CourseExistsAsync(courseDto))
            {
                throw new Exception($"Course: {courseDto.CourseName} already exists.");
            }

            var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                throw new Exception($"Could not find course id: {id}");
            }

            course.CourseName = courseDto.CourseName;
            course.Description = courseDto.Description;
            course.CategoryId = courseDto.CategoryId;

            await _context.SaveChangesAsync();

            return courseDto;

        }

        public async Task<CourseDto> DeleteCourse(int id)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                throw new Exception($"Could not find course id: {id}");
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return MapToDto(course);
        }

        private async Task<bool> CourseExistsAsync(CourseDto courseDto)
        {
            return await _context.Courses.AnyAsync(c =>
                c.CourseName == courseDto.CourseName
                && c.Description == courseDto.Description
                && c.CategoryId == courseDto.CategoryId
            );
        }

        private Course MapToEntity(CourseDto courseDto)
        {
            return new Course
            {
                CourseName = courseDto.CourseName,
                Description = courseDto.Description,
                CategoryId = courseDto.CategoryId,
            };
        }

        private CourseDto MapToDto(Course course)
        {
            if (course == null)
            {
                throw new Exception("Course cannot be null");
            }

            return new CourseDto
            {
                Id = course.Id,
                CourseName = course.CourseName,
                Description = course.Description,
                CategoryId = course.CategoryId,
            };
        }
    }
}
