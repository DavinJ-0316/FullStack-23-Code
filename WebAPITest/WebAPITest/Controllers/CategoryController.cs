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

       
        [HttpPost]
        public CommonResult<bool> AddCategory(Category category)
        {
            bool result= this._categoryService.Add(category);


            return new CommonResult<bool>() { IsSucess = result };
        }

    }
}
