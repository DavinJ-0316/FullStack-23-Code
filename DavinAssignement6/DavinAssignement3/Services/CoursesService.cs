using DavinAssignement3.IServices;
using DavinAssignement3.Model;
using DavinAssignment3.Model;
using DavinAssignment3.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace DavinAssignement3.Services
{
    public class CoursesService : ICourseService
    {
        private readonly DavinDBContext _davinDBContext;

        public CoursesService(DavinDBContext davinDBContext)
        {
            _davinDBContext = davinDBContext;
        }


        public bool AddCourse(Course course)
        {
            this._davinDBContext.Add(course);
            bool result = this._davinDBContext.SaveChanges() > 0;
            return result;
        }

        public List<Course> GetAllCoursesWithCategories()
        {
            var courseQuery = from course in this._davinDBContext.Course
                              join category in this._davinDBContext.Category on course.CategoryId equals category.Id
                              select new Course
                              {
                                  CategoryId = course.CategoryId,
                                  Category = category,
                                  Id = course.Id,
                                  CourseName = course.CourseName,
                              };

            var courseList = courseQuery.ToList();
            return courseList;
        }

        public List<CourseOutput> GetAllCourses()
        {
            var courseQuery = from course in this._davinDBContext.Course
                              select new CourseOutput
                              {
                                  Id = course.Id,
                                  CourseName = course.CourseName,
                              };

            var courseList = courseQuery.ToList();
            return courseList;
        }

        public async Task<Course> UpdateCourseAsync(Course course)
        {
            var updatedCourse = await this._davinDBContext.Course.FirstOrDefaultAsync(x => x.Id == course.Id);

            if(updatedCourse == null)
            {
                return course;
            }

            updatedCourse.CourseName = course.CourseName;
            updatedCourse.Description = course.Description;
            updatedCourse.CategoryId = course.CategoryId;

            await this._davinDBContext.SaveChangesAsync();

            return updatedCourse;
        }
    }
}
