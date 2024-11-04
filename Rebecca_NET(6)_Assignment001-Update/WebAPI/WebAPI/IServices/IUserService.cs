using WebAPI.Models;

namespace WebAPI.IServices
{
    public interface IUserService
    {
        public Task<UserDto> AddUser(UserDto userDto);
    }
}
