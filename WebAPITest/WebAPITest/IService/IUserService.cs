using WebAPITest.Models;

namespace WebAPITest.IService
{
    public interface IUserService
    {
         bool Insert(User user);

        List<User> GetAll();

    }
}
