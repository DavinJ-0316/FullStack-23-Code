using Assignment003.IServices;
using Assignment003.Models;
using Microsoft.EntityFrameworkCore;

namespace Assignment003.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly MoocDBContext _moocDBContext;
        public CategoryService(MoocDBContext moocDBContext)
        {
            this._moocDBContext = moocDBContext;
        }

        public Category Add(Category category)
        {
            this._moocDBContext.Categories.Add(category);
            this._moocDBContext.SaveChanges();
            return category;
        }

        public List<Category> GetCategories()
        {
            #region search one way
            //var categorys = this._moocDBContext.Categories.ToList();
            //return categorys;
            #endregion


            #region search another way 
            var categorys = from category in this._moocDBContext.Categories
                            select category;

            return categorys.ToList();

            #endregion
        }

        public Category? GetCategoryByName(string name)
        {
            //return this._moocDBContext.Category.FirstOrDefault(x => x.CategroyName == name);//lambda expression

            //lINQ
            var categorys = from category in this._moocDBContext.Categories
                            where category.CategroyName == name
                            select category;

            //return categorys.FirstOrDefault();
            this._moocDBContext.Courses.Include(x => x.Category).ToList();

            var resul = from course in this._moocDBContext.Courses
                        join categorie in this._moocDBContext.Categories on course.CategoryId equals categorie.Id into t
                        from categorie in t.DefaultIfEmpty()
                        select new
                        {
                            Id = course.Id,
                            CourseName = course.CourseName,
                            CategroyName = categorie.CategroyName
                        };

            return categorys.First();//if there is no data in the table category, it will throw the exception
        }

        public async Task<Category> UpdateCategoryAsync(Category category)
        {
            var updateCategory = await this._moocDBContext.Categories.FirstOrDefaultAsync(x => x.Id == category.Id);
            if (updateCategory != null)
            {
                updateCategory.CategoryLevel = category.CategoryLevel;
                updateCategory.CategroyName = category.CategroyName;
                updateCategory.ParentId = category.ParentId;

                await this._moocDBContext.SaveChangesAsync();
                return updateCategory;
            }

            return category;
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var deleteCategory = await this._moocDBContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (deleteCategory != null)
            {
                this._moocDBContext.Categories.Remove(deleteCategory);
                return await this._moocDBContext.SaveChangesAsync() > 0;
            }

            return false;
        }
    }
}
