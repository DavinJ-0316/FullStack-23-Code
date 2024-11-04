using Microsoft.AspNetCore.Mvc;
using DavinAssignement3.Model;
using DavinAssignement3.Enum;
using DavinAssignement3.ViewModel;
using DavinAssignement3.IServices;
using Microsoft.AspNetCore.Authorization;
using DavinAssignment3.Model;

namespace DavinAssignement3.Controllers
{
    [Authorize] // must have otherwise jwt restriction will not apply! alternative to AuthorizeFilter
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpGet]
        public JsonResult GetUserInfo()
        {
            List<User> users = this._userService.GetUsers();

            List<UserOutput> usersOutput = new List<UserOutput>();

            foreach (User user in users)
            {
                UserOutput output = new UserOutput();
                output.UserName = user.UserName;
                output.Address = user.Address;
                output.Gender = user.Gender;
                output.Email = user.Email;
                output.Phone = user.Phone;
                usersOutput.Add(output);
            }

            return Utility.Utility.CustomValidationForList(usersOutput, NotFound("User not found"));
        }

        /// <summary>
        /// Register a user (please manually create user table in DB)
        /// </summary>
        /// <param name="user">UserInput</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost]
        public JsonResult register([FromBody] UserInput userInput)
        {
            User user = new User
            {
                Email = userInput.Email,
                Password = userInput.Password,
                Phone = userInput.Phone,
                Address = userInput.Address,
                Gender = userInput.Gender,
                UserName = userInput.UserName,
            };

            bool sqlOperation() 
            {
               return this._userService.AddUser(user);
            };   

            return Utility.Utility.CustomValidation(user, NotFound("User not found"), sqlOperation);
        }

        /// <summary>
        /// Register a user (please manually create user table in DB)
        /// </summary>
        /// <param name="user">UserInput</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost]
        public JsonResult registerFromForm([FromForm] AddUserInput userInput)
        {
            User user = new User
            {
                Email = userInput.Email,
                Password = userInput.Password,
                Phone = userInput.Phone,
                Address = userInput.Address,
                Gender = userInput.Gender,
                UserName = userInput.UserName,
            };

            bool sqlOperation()
            {
                return this._userService.AddUser(user);
            };

            return Utility.Utility.CustomValidation(user, NotFound("User not found"), sqlOperation);
        }

        [HttpPost]
        public JsonResult updateUser([FromBody] UpdateUserInput userInput)
        {
            User user = new User
            {
               /* Id = userInput.Id,*/
                Email = userInput.Email,
                Password = userInput.Password,
                Phone = userInput.Phone,
                Address = userInput.Address,
                Gender = userInput.Gender,
                UserName = userInput.UserName,
            };

            bool sqlOperation()
            {
                return this._userService.UpdateUser(user);
            };

            return Utility.Utility.CustomValidation(user, NotFound("User not found"), sqlOperation);
        }


        [HttpDelete]
        public JsonResult DeleteUser(string email)
        {
            bool sqlOperation()
            {
                return this._userService.DeleteUser(email);
            };

            return Utility.Utility.CustomValidation(email, NotFound("User not found"), sqlOperation);
        }
    }
}
