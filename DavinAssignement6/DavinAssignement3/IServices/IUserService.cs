using DavinAssignement3.Model;

namespace DavinAssignement3.IServices
{
    public interface IUserService
    {
        bool AddUser(User user);
        List<User> GetUsers();

        bool UpdateUser(User user);

        bool DeleteUser(string email);
    }
}
