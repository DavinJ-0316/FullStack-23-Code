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

        public bool Add(Category category)
        {
            this._moocDBContext.Category.Add(category);
            return this._moocDBContext.SaveChanges() > 0;
        }


    }
}
