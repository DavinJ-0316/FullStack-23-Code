using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.IServices;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDto>> Post(CategoryDto categoryDto)
        {
            if (categoryDto == null)
            {
                return BadRequest(
                    new CommonResult
                    {
                        Errors = new List<string> { "Category details cannot be empty." },
                    }
                );
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdCategory = await _categoryService.AddCategory(categoryDto);
                return Ok(createdCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(new CommonResult { Errors = new List<string> { ex.Message } });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> Get()
        {
            try
            {
                var categoryDtos = await _categoryService.GetAllCategories();
                return Ok(categoryDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(new CommonResult { Errors = new List<string> { ex.Message } });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> Get(int id)
        {
            try
            {
                var categoryDto = await _categoryService.GetCategoryById(id);
                return Ok(categoryDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new CommonResult { Errors = new List<string> { ex.Message } });
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<CategoryDto>> Put(int id, CategoryDto categoryDto)
        {
           
            //if (id.ToString() == null)
            //{
            //    return BadRequest(
            //        new CommonResult
            //        {
            //            Errors = new List<string> { "Category Id cannot be empty." },
            //        }
            //    );
            //}

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var updatedCategoryDto = await _categoryService.UpdateCategory(id, categoryDto);
                return Ok(updatedCategoryDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new CommonResult { Errors = new List<string> { ex.Message } });
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<CategoryDto>> Delete(int id)
        {
            try
            {
                var deletedCategory = await _categoryService.DeleteCategory(id);
                return Ok($"Removed category: {deletedCategory.CategoryName}");
            }
            catch (Exception ex)
            {
                return BadRequest(new CommonResult { Errors = new List<string> { ex.Message } });
            }
        }

        [HttpGet]
        public async Task<ActionResult<CommonResult<CategoryDto>>> Test001()
        {
            CommonResult<CategoryDto> result = new CommonResult<CategoryDto>();
            return Ok(result);
        }
    }
}
