using System.Net;
using WebAPITest.Models;

namespace WebAPITest.Service
{
    public class UserService
    {
        private List<User> _users = new List<User>()
        {
            new User() { Id=1,UserName="lily", Address="Brisbane"},
            new User() { Id = 2, UserName = "mike", Address = "Brisbane" },
            new User() { Id = 3, UserName = "tom", Address = "Brisbane" }
        };
        public UserService()
        {
            Console.WriteLine("Create UserService {0}",DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        }
        public User? GetUserByName(string userName)
        {
            //return _users.FirstOrDefault(x => x.UserName == userName);

            for (int i = 0; i < _users.Count; i++)
            {
                if (_users[i].UserName == userName)
                {

                    return _users[i];
                }
            }

            return null;
        }

        public void DeleteAll()
        {
            _users.Clear();
        }
    }
}
