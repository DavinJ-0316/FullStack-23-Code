using Assignment003.IServices;
using Assignment003.Models;
using Assignment003.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Assignment003.Controllers
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
        public Category AddCategory(AddCategoryInput input)
        {
            Category category = new Category();
            category.CategroyName = input.CategroyName;
            category.CategoryLevel = input.CategoryLevel;
            category.ParentId = input.ParentId;
            var result = this._categoryService.Add(category);
            return result;
        }

        [Authorize]
        [HttpGet]
        public List<CategoryOutput> GetCategory()
        {
            var result = this._categoryService.GetCategories();
            List<CategoryOutput> resultList = new List<CategoryOutput>();
            foreach (var category in result)
            {
                var outp = new CategoryOutput();
                outp.CategroyName = category.CategroyName;
                outp.CategoryLevel = category.CategoryLevel;
                outp.ParentId = category.ParentId;

                resultList.Add(outp);
            }
            return resultList;
        }

        [HttpPost]
        public async Task<CategoryOutput> UpdateCategoryAsync(UpdateCategoryInput input)
        {

            Category category = new Category();
            category.CategroyName = input.CategroyName;
            category.CategoryLevel = input.CategoryLevel;
            category.ParentId = input.ParentId;

            var reslutCategory = await this._categoryService.UpdateCategoryAsync(category);

            var categoryOutput = new CategoryOutput()
            {
                Id = reslutCategory.Id,
                CategroyName = reslutCategory.CategroyName,
                CategoryLevel = reslutCategory.CategoryLevel
            };
            return categoryOutput;

        }

        [HttpDelete]
        public async Task<bool> DeleteCategoryAsync(int Id)
        {
            bool result = await this._categoryService.DeleteCategoryAsync(Id);
            return result;
        }
    }
}
