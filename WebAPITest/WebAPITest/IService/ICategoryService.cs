using WebAPITest.Models;

namespace WebAPITest.IService
{
    public interface ICategoryService
    {
        Category Add(Category category);

        List<Category> GetCategories();

        Category? GetCategoryByName(string name);

        Category UpdateCategory(Category category);

        bool DeleteCategory(int id);
    }


}
