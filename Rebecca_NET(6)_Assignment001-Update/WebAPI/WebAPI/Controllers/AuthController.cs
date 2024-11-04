using Microsoft.AspNetCore.Mvc;
using WebAPI.IServices;
using WebAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly DBContext _dbContext;

    public AuthController(IAuthService authService, DBContext dbContext)
    {
        _authService = authService;
        _dbContext = dbContext;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserDto request)
    {
        if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
        {
            return Unauthorized("Invalid username or password");
        }

        var user = _dbContext.Users.SingleOrDefault(u => u.Username == request.Username);

        if (user == null)
        {
            return Unauthorized("Invalid username or password");
        }

        if (request.Password != user.Password)
        {
            return Unauthorized("Invalid username or password");
        }

        var token = _authService.GenerateJwtToken(request.Username);
        return Ok(new { Token = token });
    }
}
