using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using WebAPITest.IService;
using WebAPITest.Models;

namespace WebAPITest.Service
{
    public class CourseCategoryService : ICategoryService
    {
        private readonly MoocDBContext _moocDBContext;
        public CourseCategoryService(MoocDBContext moocDBContext)
        {
            this._moocDBContext = moocDBContext;
        }

        public Category Add(Category category)
        {
            this._moocDBContext.Category.Add(category);
            this._moocDBContext.SaveChanges();
            return category;
        }

        public bool DeleteCategory(int id)
        {
            var deleteCategory = this._moocDBContext.Category.FirstOrDefault(x => x.Id == id);
            if (deleteCategory != null)
            {

                this._moocDBContext.Category.Remove(deleteCategory);
                return this._moocDBContext.SaveChanges() > 0;
            }

            return false;
        }

        public List<Category> GetCategories()
        {
            //var categorys= this._moocDBContext.Category.ToList();

            ////var categorys = from category in this._moocDBContext.Category
            ////                select category;

            //return categorys.ToList();


            // var categorys = this._moocDBContext.Category.Include(x=>x.Courses).ToList();

            //var categorys = from category in this._moocDBContext.Category
            //                join course in this._moocDBContext.Course on category.Id equals course.Id
            //                select new Category
            //                {
            //                    Id = category.Id,
            //                    CategoryLevel = category.CategoryLevel,
            //                    CategroyName = category.CategroyName,
            //                    Courses = new List<Course>() { course }
            //                };



            //return categorys.ToList();

            //不用就不查询
            var categorys = this._moocDBContext.Category.Include(x => x.Courses);

            //foreach才会执行语句
            foreach (var category in categorys)
            {

               ///var c= category.Courses.ToList();
            }


            return null;
        }

        public Category? GetCategoryByName(string name)
        {
            //return this._moocDBContext.Category.FirstOrDefault(x => x.CategroyName == name);//lambda expression

            //lINQ
            var categorys = from category in this._moocDBContext.Category
                            where category.CategroyName == name
                            select category;

            return categorys.FirstOrDefault();
        }

        public Category UpdateCategory(Category category)
        {

            var updateCategory = this._moocDBContext.Category.FirstOrDefault(x => x.Id == category.Id);
            if (updateCategory != null)
            {
                updateCategory.CategoryLevel = category.CategoryLevel;
                updateCategory.CategroyName = category.CategroyName;
                updateCategory.ParentId = category.ParentId;

                this._moocDBContext.SaveChanges();
                return updateCategory;
            }

            return category;
        }
    }
}
