using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.IServices;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpPost]
        public async Task<ActionResult<CourseDto>> AddCourse(CourseDto courseDto)
        {
            if (courseDto == null)
            {
                return BadRequest(
                    new CommonResult
                    {
                        Errors = new List<string> { "Course details cannot be empty." },
                    }
                );
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdCourse = await _courseService.AddCourse(courseDto);
                return Ok(createdCourse);
            }
            catch (Exception ex)
            {
                return BadRequest(new CommonResult { Errors = new List<string> { ex.Message } });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetAllCourses()
        {
            try
            {
                var courseDtos = await _courseService.GetAllCourses();
                return Ok(courseDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(new CommonResult { Errors = new List<string> { ex.Message } });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDto>> GetCourseById(int id)
        {
            if (id.ToString() == null)
            {
                return BadRequest(
                    new CommonResult { Errors = new List<string> { "Course Id cannot be empty." } }
                );
            }

            try
            {
                var courseDto = await _courseService.GetCourseById(id);
                return Ok(courseDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new CommonResult { Errors = new List<string> { ex.Message } });
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<CourseDto>> UpdateCourseById(int id, CourseDto courseDto)
        {
            if (id.ToString() == null)
            {
                return BadRequest(
                    new CommonResult { Errors = new List<string> { "Course Id cannot be empty." } }
                );
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var updatedCourseDto = await _courseService.UpdateCourse(id, courseDto);
                return Ok(updatedCourseDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new CommonResult { Errors = new List<string> { ex.Message } });
            }

        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<CourseDto>> DeleteCourseById(int id)
        {
            try
            {
                var deletedCourse = await _courseService.DeleteCourse(id);
                return Ok($"Remove course: {deletedCourse.CourseName}");
            }
            catch (Exception ex)
            {
                return BadRequest(new CommonResult { Errors = new List<string> { ex.Message } });

            }
        }
    }
}
