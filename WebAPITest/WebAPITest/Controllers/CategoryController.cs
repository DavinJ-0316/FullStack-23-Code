using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPITest.IService;
using WebAPITest.Models;
using WebAPITest.ViewModel;

namespace WebAPITest.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            this._categoryService = categoryService;
        }

        /// <summary>
        /// Add category
        /// </summary>
        /// <param name="category">Category</param>
        /// <returns></returns>
        [HttpPost]
        public CommonResult<Category> AddCategory(Category category)
        {
            var result = this._categoryService.Add(category);
            return new CommonResult<Category>() { IsSucess = true, Result = result };
        }


        [HttpGet]
        public CommonResult<List<Category>> GetCategory()
        {
            var result = this._categoryService.GetCategories();
            return new CommonResult<List<Category>>() { IsSucess = true, Result = result };
        }


    }
}
