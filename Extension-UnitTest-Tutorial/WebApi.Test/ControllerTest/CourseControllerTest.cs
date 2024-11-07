using Microsoft.AspNetCore.Mvc;
using Moq;
using WebAPI.Controllers;
using WebAPI.DTOs;
using WebAPI.IServices;

namespace WebApi.Test.ControllerTest;

public class CourseControllerTest
{
    private readonly Mock<ICourseService> mockCourseService;

    public CourseControllerTest()
    {
        mockCourseService = new Mock<ICourseService>();
    }

    [Fact]
    public async Task AddCourseTest_Should_Add_New_Course()
    {
        var course = new CourseDto
        {
            CourseName = "Test",
            Description = "Test",
            CategoryId = 2
        };

        var createdCourse = new CourseDto
        {
            CourseName = course.CourseName,
            Description = course.Description,
            CategoryId = course.CategoryId
        };

        mockCourseService.Setup(service => service.AddCourse(course)).ReturnsAsync(createdCourse);

        var controller = new CourseController(mockCourseService.Object);

        var createdResponse = await controller.AddCourse(course);

        var item = Assert.IsType<OkObjectResult>(createdResponse.Result);
        var courseItem = Assert.IsType<CourseDto>(item.Value);

        Assert.Equal(course.CourseName, courseItem.CourseName);
        Assert.Equal(course.Description, courseItem.Description);
        Assert.Equal(course.CategoryId, courseItem.CategoryId);

        var incompleteCourse = new CourseDto
        {
            CourseName = "Test",
            Description = "Test"
        };

        controller.ModelState.AddModelError("CourseName", "Course name is a required filled.");
        var badRequest = await controller.AddCourse(incompleteCourse);

        Assert.IsType<BadRequestObjectResult>(badRequest.Result);
    }
}