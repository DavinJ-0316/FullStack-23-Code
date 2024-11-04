using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.IServices
{
    public interface ICategoryService
    {
        public Task<CategoryDto> AddCategory(CategoryDto categoryDto);
        public Task<IEnumerable<CategoryDto>> GetAllCategories();
        public Task<CategoryDto> GetCategoryById(int id);
        public Task<CategoryDto> UpdateCategory(int id, CategoryDto categoryDto);
        public Task<CategoryDto> DeleteCategory(int id);
    }
}
