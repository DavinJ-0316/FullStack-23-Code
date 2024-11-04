using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;
using WebAPI.Exceptions;
using WebAPI.IServices;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly DBContext _context;

        public CategoryService(DBContext dBContext)
        {
            _context = dBContext;
        }

        public async Task<CategoryDto> AddCategory(CategoryDto categoryDto)
        {
            if (await CategoryExistsAsync(categoryDto))
            {
                //throw new Exception(
                //    $"Category: {categoryDto.CategoryName} in level {categoryDto.CategoryLevel} already exists."
                //);

                throw new BusinessException(
                   $"Category: {categoryDto.CategoryName} in level {categoryDto.CategoryLevel} already exists."
               );
        
            }

            var category = MapToEntity(categoryDto);

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return categoryDto;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategories()
        {
            var categories = await _context
                .Categories.Include(c => c.SubCategories)
                .Include(c => c.Courses)
                .ToListAsync();

            var categoryDtos = categories.Select(MapToDto);

            return categoryDtos;
        }

        public async Task<CategoryDto> GetCategoryById(int id)
        {
            var category = await _context
                .Categories.Include(c => c.SubCategories)
                .Include(c => c.Courses)
                .FirstOrDefaultAsync(c => c.Id == id);
            if (category == null)
            {
                throw new Exception($"Could not find category {id}");
            }

            return MapToDto(category);
        }

        public async Task<CategoryDto> UpdateCategory(int id, CategoryDto categoryDto)
        {
            if (await CategoryExistsAsync(categoryDto))
            {
                throw new Exception(
                    $"Category with the name '{categoryDto.CategoryName}' and 'level {categoryDto.CategoryLevel}' already exists."
                );
            }

            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                throw new Exception($"Could not find category id: {id}");
            }

            category.CategoryName = categoryDto.CategoryName;
            category.CategoryLevel = categoryDto.CategoryLevel;
            category.ParentId = categoryDto.ParentId;

            await _context.SaveChangesAsync();

            return categoryDto;
        }

        public async Task<CategoryDto> DeleteCategory(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                throw new Exception($"Could not find category id: {id}");
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return MapToDto(category);
        }

        private async Task<bool> CategoryExistsAsync(CategoryDto categoryDto)
        {
            return await _context.Categories.AnyAsync(c =>
                c.CategoryName == categoryDto.CategoryName
                && c.CategoryLevel == categoryDto.CategoryLevel
                && c.ParentId == categoryDto.ParentId
            );
        }

        private Category MapToEntity(CategoryDto categoryDto)
        {
            return new Category
            {
                CategoryName = categoryDto.CategoryName,
                CategoryLevel = categoryDto.CategoryLevel,
                ParentId = categoryDto.ParentId,
            };
        }

        public CategoryDto MapToDto(Category category)
        {
            if (category == null)
            {
                throw new Exception("Category cannot be null");
            }

            return new CategoryDto
            {
                Id = category.Id,
                CategoryName = category.CategoryName,
                CategoryLevel = category.CategoryLevel,
                ParentId = category.ParentId,
                SubCategories =
                    category.SubCategories?.Select(MapToDto).ToList() ?? new List<CategoryDto>(),
                Courses =
                    category
                        .Courses?.Select(course => new CourseDto
                        {
                            Id = course.Id,
                            CourseName = course.CourseName,
                            Description = course.Description,
                            CategoryId = course.CategoryId
                        })
                        .ToList() ?? new List<CourseDto>(),
            };
        }
    }
}
