using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPITest.Filters;
using WebAPITest.IService;
using WebAPITest.Models;
using WebAPITest.ViewModel;

namespace WebAPITest.Controllers
{
    
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly ILogger<CourseController> _logger;
        public CourseController(ICourseService courseService, ILogger<CourseController> logger)
        {
            this._courseService = courseService;
            this._logger = logger;
        }

        [PermissionCode("pm001")]
        [HttpPost]
        public CommonResult<bool> AddCourse(Course course)
        {
            var result = this._courseService.AddCourse(course);
            return new CommonResult<bool>() { IsSucess = result };
        }

        [Authorize]
        [HttpGet]
        public CommonResult<List<Course>> GetCourse()
        {
            var result = this._courseService.GetCourse();
            this._logger.LogWarning("this is my log in CourseController"); 
            this._logger.LogInformation("this is my log in CourseController LogInformation");
            return new CommonResult<List<Course>>() { IsSucess = true, Message="", Result=result };
        }

        [PermissionCode("pm002")]
        [HttpPost]
        public async Task<CommonResult<Course>> UpdateCourseAsync(Course course)
        {
            var result = await this._courseService.UpdateCourseAsync(course);
            return new CommonResult<Course>() { IsSucess = true, Message="", Result=result };
        }
    }
}
