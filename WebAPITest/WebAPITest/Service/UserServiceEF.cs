using Microsoft.EntityFrameworkCore;
using WebAPITest.IService;
using WebAPITest.Models;

namespace WebAPITest.Service
{
    public class UserServiceEF : IUserService
    {
        private readonly MoocDBContext _moocDBContext;
        public UserServiceEF(MoocDBContext moocDBContext)
        {
            this._moocDBContext = moocDBContext;
        }

        public List<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<UserEF> GetUserByNameAsync(string username)
        {
            var user = await this._moocDBContext.UserEF.FirstOrDefaultAsync(x => x.UserName == username);
            return user;
        }

        public bool Insert(User user)
        {
            throw new NotImplementedException();
        }
    }
}
