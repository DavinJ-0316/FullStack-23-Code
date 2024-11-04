using Assignment003.Models;

namespace Assignment003.IServices
{
    public interface ICategoryService
    {
        Category Add(Category category);
        List<Category> GetCategories();
        Category? GetCategoryByName(string name);
        Task<Category> UpdateCategoryAsync(Category category);
        Task<bool> DeleteCategoryAsync(int id);
    }
}
