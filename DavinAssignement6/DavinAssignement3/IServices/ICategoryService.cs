using DavinAssignment3.Model;
using DavinAssignment3.ViewModel;

namespace DavinAssignement3.IServices
{
    public interface ICategoryService
    {
        bool AddCategory(Category category);

        List<CategoryOutput> GetCategories();

        List<Category> GetCategoriesWithCourses();

        Category UpdateCategory(Category category);

        bool DeleteCategory(int id);
    }
}
