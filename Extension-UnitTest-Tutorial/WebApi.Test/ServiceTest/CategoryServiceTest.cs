using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Services;

namespace WebApi.Test.ServiceTest;

public class CategoryServiceTest
{
    private List<Category> LoadCategoriesFromJson(string filePath)
    {
        using (var reader = new StreamReader(filePath))
        {
            var json = reader.ReadToEnd();
            return JsonConvert.DeserializeObject<List<Category>>(json);
        }
    }

    [Fact]
    public async Task GetAllCategories_Should_Return_All_Categories()
    {
        var categories = LoadCategoriesFromJson("MockData/categories.json");

        var options = new DbContextOptionsBuilder<DBContext>()
            .UseInMemoryDatabase("TestDatabase_1") //To solve same db conflicts, rename dbname
            .Options;

        using (var context = new DBContext(options))
        {
            context.Categories.AddRange(categories);
            context.SaveChanges();
        }

        using (var context = new DBContext(options))
        {
            var service = new CategoryService(context);
            var result = await service.GetAllCategories();
            var topLevelCategories = result.Where(c => c.CategoryLevel == "1").ToList();

            Assert.Equal(categories.Count, topLevelCategories.Count());
        }
    }

    [Fact]
    public async Task Get_Category_By_ID_Should_Return_Specific_Record()
    {
        //Arrange
        var categories = LoadCategoriesFromJson("MockData/categories.json");

        var options = new DbContextOptionsBuilder<DBContext>()
            .UseInMemoryDatabase("TestDatabase_2")
            .Options;

        //Action
        using (var context = new DBContext(options))
        {
            context.Categories.AddRange(categories);
            context.Courses.AddRange(categories.SelectMany(x=>x.Courses));
            context.SaveChanges();

            var service = new CategoryService(context);
            var result = await service.GetCategoryById(1);

            //Assert
            Assert.NotNull(result);
            Assert.True(result.Id == 1);
        }
    }

    [Fact]
    public async Task Add_Category_Should_Increase_Number_With_1()
    {
        //Arrange
        CategoryDto dataModel = new CategoryDto()
        {
            CategoryLevel = "1",
            CategoryName = "Test",
            Id = 1000,            
            ParentId = 1            
        };        

        var categories = LoadCategoriesFromJson("MockData/categories.json");
        var options = new DbContextOptionsBuilder<DBContext>()
            .UseInMemoryDatabase("TestDatabase_3")
            .Options;

        //Action
        using (var context = new DBContext(options))
        {
            context.Categories.AddRange(categories);            
            context.SaveChanges();
            int beforeCount = context.Categories.Count();

            var service = new CategoryService(context);
            await service.AddCategory(dataModel);

            int afterCount = context.Categories.Count();
            //Assert
            Assert.True(beforeCount + 1 == afterCount);
        }
    }

    [Fact]
    public async Task Delete_Not_Existing_Category_Should_Throw_Exception()
    {
        //Arrange
        CategoryDto dataModel = new CategoryDto()
        {
            CategoryLevel = "1",
            CategoryName = "Test",
            Id = 1000,
            ParentId = 1
        };

        var categories = LoadCategoriesFromJson("MockData/categories.json");
        var options = new DbContextOptionsBuilder<DBContext>()
            .UseInMemoryDatabase("TestDatabase_4")
            .Options;

        //Action
        using (var context = new DBContext(options))
        {
            var service = new CategoryService(context);
            await Assert.ThrowsAsync<ArgumentException>(async () => { await service.DeleteCategory(-99999); });
        }
    }
}