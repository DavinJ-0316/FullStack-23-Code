using Microsoft.AspNetCore.Mvc;
using Moq;
using WebAPI.Controllers;
using WebAPI.DTOs;
using WebAPI.IServices;
using WebAPI.Models;

namespace WebApi.Test.ControllerTest;

public class CategoryControllerTest
{
    private readonly Mock<ICategoryService> mockCategoryService;

    public CategoryControllerTest()
    {
        mockCategoryService = new Mock<ICategoryService>();

        mockCategoryService.Setup(service => service.GetAllCategories())
            .ReturnsAsync(MockCategories.Select(c => new CategoryDto
            {
                Id = c.Id,
                CategoryName = c.CategoryName,
                CategoryLevel = c.CategoryLevel,
                ParentId = c.ParentId
            }).ToList());
    }

    private IList<Category> MockCategories =>
        new List<Category>
        {
            new()
            {
                Id = 1,
                CategoryName = "Electronics",
                CategoryLevel = "1",
                ParentId = null,
                SubCategories = new List<Category>
                {
                    new()
                    {
                        Id = 2,
                        CategoryName = "Computers",
                        CategoryLevel = "2",
                        ParentId = 1,
                        SubCategories = new List<Category>(),
                        Courses = new List<Course>()
                    },
                    new()
                    {
                        Id = 3,
                        CategoryName = "Mobile Phones",
                        CategoryLevel = "2",
                        ParentId = 1,
                        SubCategories = new List<Category>(),
                        Courses = new List<Course>()
                    }
                },
                Courses = new List<Course>()
            },
            new()
            {
                Id = 4,
                CategoryName = "Books",
                CategoryLevel = "1",
                ParentId = null,
                SubCategories = new List<Category>
                {
                    new()
                    {
                        Id = 5,
                        CategoryName = "Fiction",
                        CategoryLevel = "2",
                        ParentId = 4,
                        SubCategories = new List<Category>(),
                        Courses = new List<Course>()
                    },
                    new()
                    {
                        Id = 6,
                        CategoryName = "Non-Fiction",
                        CategoryLevel = "2",
                        ParentId = 4,
                        SubCategories = new List<Category>(),
                        Courses = new List<Course>()
                    }
                },
                Courses = new List<Course>()
            }
        };

    [Fact]
    public async Task GetAllCategories_Should_Return_All_Categories()
    {
        var controller = new CategoryController(mockCategoryService.Object);
        var result = await controller.Get();

        Assert.NotNull(result);
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var resultCategories = Assert.IsAssignableFrom<IEnumerable<CategoryDto>>(okResult.Value);


        var expectedCategories = MockCategories.Select(c => new CategoryDto
        {
            Id = c.Id,
            CategoryName = c.CategoryName,
            CategoryLevel = c.CategoryLevel,
            ParentId = c.ParentId
        }).ToList();

        Assert.Equal(expectedCategories.Count, resultCategories.Count());

        foreach (var mockCategory in expectedCategories)
        {
            var actualCategory = resultCategories.FirstOrDefault(c => c.Id == mockCategory.Id);
            Assert.NotNull(actualCategory);
            Assert.Equal(mockCategory.CategoryName, actualCategory.CategoryName);
        }
    }
}