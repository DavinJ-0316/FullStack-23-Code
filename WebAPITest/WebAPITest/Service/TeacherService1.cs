using WebAPITest.IService;
using WebAPITest.Models;

namespace WebAPITest.Service
{
    public class TeacherService1 : ITeacherService
    {
        public string GetTeacher()
        {
            return "I am the teacher two";
        }

        public User GetUser(string username)
        {
            return new User() { Id = 5, UserName = username };
        }

        public void DeleteAll()
        {

        }

        public void Dispose()
        {
            Console.WriteLine("Dispose TeacherService1 {0}", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        }
    }
}
