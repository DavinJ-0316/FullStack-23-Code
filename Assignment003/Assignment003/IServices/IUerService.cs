using Assignment003.Models;

namespace Assignment003.IServices
{
    public interface IUerService
    {
        bool AddUser(User user);
        List<User> GetUsers();

        bool UpdateUsers(User user);

        bool DeleteUser(int id);

        User GetUserbyUserName(string userName);
    }
}
