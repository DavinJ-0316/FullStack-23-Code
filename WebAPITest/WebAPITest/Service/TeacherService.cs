using WebAPITest.IService;
using WebAPITest.Models;

namespace WebAPITest.Service
{
    public class TeacherService: ITeacherService
    {
        private readonly UserService _userService;
        public TeacherService(UserService userService)
        {
            this._userService = userService;

            Console.WriteLine("Create TeacherService {0}", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        }

        public User GetUser(string username)
        {
            return this._userService.GetUserByName(username);
        }


        public void DeleteAll()
        {
            this._userService.DeleteAll();
        }

        public string GetTeacher()
        {
            return "I am the teacher one";
        }

        public void Dispose()
        {
            Console.WriteLine("Dispose TeacherService {0}", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        }
    }
}
