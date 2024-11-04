using Assignment003.IServices;
using Assignment003.Models;
using Assignment003.Services;
using Assignment003.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace Assignment003.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IUerService _userService;
        private readonly CreateTokenService _createTokenService;
        public LoginController(IUerService userService, CreateTokenService createTokenService, ILogger<LoginController> logger)
        {
            this._userService = userService;
            this._createTokenService = createTokenService;
            _logger = logger;
        }

        [HttpPost]
        public LoginOutput Login(LoginInput input)
        {
            var user =  this._userService.GetUserbyUserName(input.UserName);
            this._logger.LogWarning("this is a log warning test");
            this._logger.LogError("this is a log error test");
            this._logger.LogDebug("this is a log debug test");
            if (user == null)
            {
                return null;
            }

            if (user.Password == input.Password)
            {
                Dictionary<string, string> playBody = new Dictionary<string, string>();
                playBody.Add("UserId", user.Id.ToString());
                playBody.Add("UserName", user.UserName);
                playBody.Add("Email", user.Email);
                var accessToken = this._createTokenService.CreateToken(playBody);
               
                var result = new LoginOutput()
                {
                    AccessToken = accessToken,
                    UserId = user.Id,
                    UerName = input.UserName,       
                };
                return result;
            }

            return null;
        }
    }
}
