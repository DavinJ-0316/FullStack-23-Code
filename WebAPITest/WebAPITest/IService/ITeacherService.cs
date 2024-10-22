using MoocApi.Models;
using WebAPITest.Models;

namespace WebAPITest.IService
{
    public interface ITeacherService:IDisposable
    {
        public string GetTeacher();

        public User GetUser(string username);

        public void DeleteAll();
    }
}
