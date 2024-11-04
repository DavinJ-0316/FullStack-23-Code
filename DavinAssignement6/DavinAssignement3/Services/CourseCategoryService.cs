using DavinAssignement3.IServices;
using DavinAssignement3.Model;
using DavinAssignment3.Model;
using DavinAssignment3.ViewModel;

namespace DavinAssignement3.Services
{
    public class CourseCategoryService : ICategoryService
    {
        private readonly DavinDBContext _davinDBContext;

        public CourseCategoryService(DavinDBContext davinDBContext)
        {
            this._davinDBContext = davinDBContext;
        }

        public bool AddCategory(Category category)
        {
            this._davinDBContext.Category.Add(category);
            bool result = this._davinDBContext.SaveChanges() > 0;
            return result;
        }

        public bool DeleteCategory(int id)
        {
            var deleteCategory = this._davinDBContext.Category.FirstOrDefault(x => x.Id == id);
            if (deleteCategory != null)
            {

                this._davinDBContext.Category.Remove(deleteCategory);
                return this._davinDBContext.SaveChanges() > 0;
            }

            return false;
        }

        public List<Category> GetCategoriesWithCourses()
        {
            var categorys = from category in this._davinDBContext.Category
                            join course in this._davinDBContext.Course on category.Id equals course.CategoryId
                            select new Category
                            {
                                Id = category.Id,
                                CategoryLevel = category.CategoryLevel,
                                CategoryName = category.CategoryName,
                                Courses = new List<Course>() { course }
                            };



            return categorys.ToList();
        }

        public List<CategoryOutput> GetCategories()
        {
            var categorys = from category in this._davinDBContext.Category
                            select new CategoryOutput
                            {
                                Id = category.Id,
                                CategoryLevel = category.CategoryLevel,
                                CategoryName = category.CategoryName,
                            };



            return categorys.ToList();
        }

        public Category? GetCategoryByName(string name)
        {
            var categorys = from category in this._davinDBContext.Category
                            where category.CategoryName == name
                            select category;

            return categorys.FirstOrDefault();
        }

        public Category UpdateCategory(Category category)
        {

            var updateCategory = this._davinDBContext.Category.FirstOrDefault(x => x.Id == category.Id);
            if (updateCategory != null)
            {
                updateCategory.CategoryLevel = category.CategoryLevel;
                updateCategory.CategoryName = category.CategoryName;
                updateCategory.ParentId = category.ParentId;

                this._davinDBContext.SaveChanges();
                return updateCategory;
            }

            return category;
        }


    }
}
