using DavinAssignement3.IServices;
using DavinAssignement3.Model;
using DavinAssignement3.Services;
using DavinAssignement3.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DavinAssignement3.Controllers
{
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly CreateTokenService _createTokenService;
        private readonly IUserService _userService;
        public LoginController(CreateTokenService createTokenService, IUserService userService)
        {
            this._createTokenService = createTokenService;
            this._userService = userService;
        }

        /// <summary>
        /// login (please manually create user table in DB)
        /// </summary>
        /// <param name="login">LoginInput</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("api/login")]
        public JsonResult Login(LoginInput loginInput)
        {
            CommonResult<LoginOutput> commonResult = new CommonResult<LoginOutput>();

            List<User> users = this._userService.GetUsers();

            var user = users.Find(user => (user.Email == loginInput.Email && user.Password == loginInput.Password));

            if (user == null)
            {
                commonResult.IsSuccess = false;
                commonResult.Message = "user email or password wrong";
                return new JsonResult(commonResult);
            }

            Dictionary<string, string> playBody = new Dictionary<string, string>();
            playBody.Add("UserId", user.Id.ToString());
            playBody.Add("UserName", user.UserName);
            var accessToken = this._createTokenService.CreateToken(playBody);

            commonResult.IsSuccess = true;
            commonResult.Message = accessToken;
            commonResult.Data = new LoginOutput()
            {
                AccessToken = accessToken,
                UserName = user.UserName,
            };

            return new JsonResult(commonResult);
        }
    }
}
