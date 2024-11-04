using DavinAssignement3.IServices;
using DavinAssignement3.Model;
using DavinAssignement3.Services;
using DavinAssignement3.ViewModel;
using DavinAssignment3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DavinAssignement3.Controllers
{
    [Authorize] // must have otherwise jwt restriction will not apply! alternative to AuthorizeFilter
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _coursesService;
        private readonly ILogger<CourseController> _logger;
        public CourseController(ICourseService coursesService, ILogger<CourseController> logger)
        {
            this._coursesService = coursesService;
            this._logger = logger;
        }

        /// <summary>
        /// Add course
        /// </summary>
        /// <param name="course">Course</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult AddCourse(Course course)
        {
            bool sqlOperation()
            {
                return this._coursesService.AddCourse(course);
            };

            return Utility.Utility.CustomValidation(course, NotFound("Course not found"), sqlOperation);
        }

        /// <summary>
        /// Get All Courses Contain Categories
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetAllCoursesWithCategories()
        {
            var result = this._coursesService.GetAllCoursesWithCategories();
            this._logger.LogWarning("this is my log in CourseController");
            this._logger.LogInformation("this is my log in CourseController LogInformation");

            bool sqlOperation()
            {
                return result != null;
            };

            return Utility.Utility.CustomValidation(result, NotFound("Course not found"), sqlOperation);
        }

        /// <summary>
        /// Get All Courses Ignore Categories
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetAllCourses()
        {
            var result = this._coursesService.GetAllCourses();
            this._logger.LogWarning("this is my log in CourseController");
            this._logger.LogInformation("this is my log in CourseController LogInformation");

            bool sqlOperation()
            {
                return result != null;
            };

            return Utility.Utility.CustomValidation(result, NotFound("Course not found"), sqlOperation);
        }

        /// <summary>
        /// update course
        /// </summary>
        /// <param name="course">Course</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult UpdateCourse(Course course)
        {
            var result = this._coursesService.UpdateCourseAsync(course);

            bool sqlOperation()
            {
                return result != null;
            };

            return Utility.Utility.CustomValidation(result, NotFound("Category not found"), sqlOperation);
        }

    }
}
