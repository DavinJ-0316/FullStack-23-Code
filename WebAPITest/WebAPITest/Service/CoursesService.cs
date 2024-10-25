using Microsoft.EntityFrameworkCore;
using WebAPITest.IService;
using WebAPITest.Models;

namespace WebAPITest.Service
{
    public class CoursesService : ICourseService
    {
        private readonly MoocDBContext _moocDBContext;
        public CoursesService(MoocDBContext moocDBContext)
        {
            this._moocDBContext = moocDBContext;
        }

        public bool AddCourse(Course course)
        {
            this._moocDBContext.Course.Add(course);
            var result = this._moocDBContext.SaveChanges() > 0;
            return result;
        }

        public List<Course> GetCourse()
        {
            //var courseList = this._moocDBContext.Course.Include(x => x.Category).ToList();

            var courseQuery = from course in this._moocDBContext.Course
                              join category in this._moocDBContext.Category on course.CategoryId equals category.Id
                              select new Course
                              {
                                  CategoryId = course.CategoryId,
                                  Category = category,
                                  Id = course.Id,
                                  CourseName = course.CourseName
                              };
            var courseList = courseQuery.ToList();//lazy loading

            return courseList;
        }

        //异步
        public async Task<Course> UpdateCourseAsync(Course course)
        {
            //thread id--get the current executing thread ID
            Console.WriteLine("UpdateCourse Thread id:  {0}", Thread.CurrentThread.ManagedThreadId);

            var updateCourse = await this._moocDBContext.Course.FirstOrDefaultAsync(x => x.Id == course.Id);
            Console.WriteLine("FirstOrDefaultAsync Thread id:  {0}", Thread.CurrentThread.ManagedThreadId);

            if (updateCourse != null)
            {
                updateCourse.CourseName = course.CourseName;
                updateCourse.Description = course.Description;
                updateCourse.CategoryId = course.CategoryId;

                await this._moocDBContext.SaveChangesAsync();
                Console.WriteLine("SaveChangesAsync Thread id:  {0}", Thread.CurrentThread.ManagedThreadId);
                return updateCourse;
            }

            return course;
        }
    }
}
