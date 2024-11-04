using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;
using WebAPI.IServices;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly DBContext _context;

        public UserService(DBContext dBContext)
        {
            _context = dBContext;
        }

        public async Task<UserDto> AddUser([FromBody] UserDto userDto)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == userDto.Username);

            if (existingUser != null)
            {
                throw new Exception($"User: {userDto.Username} already exists.");
            }

            var user = new User
            {
                Username = userDto.Username,
                Password = userDto.Password

            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return userDto;
        }
    }
}
