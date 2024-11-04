using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.IServices;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Post(UserDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest(
                    new CommonResult
                    {
                        Errors = new List<string> { "User details cannot be empty." },
                    }
                );
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdUser = await _userService.AddUser(userDto);
                return Ok(createdUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new CommonResult { Errors = new List<string> { ex.Message } });
            }
        }
    }
}
