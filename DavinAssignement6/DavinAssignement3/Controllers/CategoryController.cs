using DavinAssignement3.IServices;
using DavinAssignement3.ViewModel;
using DavinAssignment3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace DavinAssignement3.Controllers
{
    [Authorize] // must have otherwise jwt restriction will not apply! alternative to AuthorizeFilter
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(ICategoryService categoryService, ILogger<CategoryController> logger)
        {
            _categoryService = categoryService;
            _logger = logger;
        }

        /// <summary>
        /// Add category
        /// </summary>
        /// <param name="category">Category</param>
        /// <returns></returns>
        [HttpPost("api/catgory/addcategory")]
        public JsonResult AddCategory(Category category)
        {
            bool sqlOperation()
            {
                return this._categoryService.AddCategory(category);
            };

            return Utility.Utility.CustomValidation(category, NotFound("Category not found"), sqlOperation);
        }

        /// <summary>
        /// Get All Categories Contain Courses
        /// </summary>
        /// <returns></returns>
        [HttpGet("api/catgory/getallcategorieswithcourses")]
        public JsonResult GetCategoriesWithCourses()
        {
            var result = this._categoryService.GetCategoriesWithCourses();

            bool sqlOperation()
            {
                return result != null;
            };

            return Utility.Utility.CustomValidation(result, NotFound("Category not found"), sqlOperation,false);
        }

        /// <summary>
        /// Get All Categories ignore Courses
        /// </summary>
        /// <returns></returns>
        [HttpGet("api/catgory/getallcategories")]
        public JsonResult GetCategories()
        {
            var result = this._categoryService.GetCategories();

            bool sqlOperation()
            {
                return result != null;
            };

            return Utility.Utility.CustomValidation(result, NotFound("Category not found"), sqlOperation,false);
        }

        /// <summary>
        /// Update category
        /// </summary>
        /// <param name="category">Category</param>
        /// <returns></returns>
        [HttpPost("api/catgory/updatecategory")]
        public JsonResult UpdateCategory(Category category)
        {
            var result = this._categoryService.UpdateCategory(category);

            bool sqlOperation()
            {
                return result != category;
            };

            return Utility.Utility.CustomValidation(result, NotFound("Category not found"), sqlOperation);
        }

/*        [HttpDelete("api/catgory/deletecategory")]
        public JsonResult DeleteCategory(int id)
        {
            bool sqlOperation()
            {
                return this._categoryService.DeleteCategory(id);
            };

            return Utility.Utility.CustomValidation(id.ToString(), NotFound("Category not found"), sqlOperation);
        }*/

    }
}
