using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using WebAPITest.IService;
using WebAPITest.Service;
using WebAPITest.ViewModel;

namespace WebAPITest.Controllers
{
    [Route("api/[controller]/[action]")]
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

        [AllowAnonymous]
        [HttpPost]
        public async Task<CommonResult<LoginOutput>> LoginAsync(LoginInput loginInput)
        {
            CommonResult<LoginOutput> commonResult = new CommonResult<LoginOutput>();
            var user = await this._userService.GetUserByNameAsync(loginInput.UserName);
            if (user == null)
            {
                commonResult.IsSucess = false;
                commonResult.Message = "";
                return commonResult;
            }

            if (user.Password == loginInput.Password)
            {
                Dictionary<string,string> playBody=new Dictionary<string,string>();
                playBody.Add("UserId", user.Id.ToString());
                playBody.Add("UserName", user.UserName);
                var accessToken= this._createTokenService.CreateToken(playBody);
                commonResult.IsSucess = true;
                commonResult.Message = "";
                commonResult.Result = new LoginOutput()
                {
                    AccessToken = accessToken,
                    UserName = loginInput.UserName,
                };
                return commonResult;
            }

            commonResult.IsSucess = false;
            commonResult.Message = "";
            return commonResult;
        }
    }
}
