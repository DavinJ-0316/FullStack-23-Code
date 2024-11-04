using Assignment003.IServices;
using Assignment003.Models;
using Assignment003.ViewModels;
using Connor_NET4Assignment.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Assignment003.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUerService _uerService;

        public UserController(IUerService uerService)
        {
            this._uerService = uerService;
        }

       
        [HttpPost]
        public CommonResult AddUser(AddUserInput input)
        {
            CommonResult commonResult = new CommonResult();
            if (!ModelState.IsValid)
            {
                commonResult.Success = false;
                commonResult.Message = "Validations are failed";

                foreach (var sate in ModelState.Values)
                {
                    foreach (var error in sate.Errors)
                    {
                        commonResult.Errors.Add(error.ErrorMessage);
                    }
                }
                return commonResult;

            }
            var user = new User()
            {
                Address = input.Address,
                UserName = input.UserName,
                Email = input.Email,
                Phone = input.Phone,
                Gender = input.Gender,
                Password = input.Password,
            };
            var success = this._uerService.AddUser(user);
            commonResult.Success = success;
            return commonResult;
        }

        [HttpGet]
        public List<UserOutput> GetList()
        {
            var list = this._uerService.GetUsers();
            List < UserOutput > userlist = new List<UserOutput>(); 
            foreach (var user in list)
            {
                UserOutput output = new UserOutput();
                output.Address = user.Address;
                output.UserName = user.UserName;
                output.Email = user.Email;
                output.Phone = user.Phone;
                output.Gender = user.Gender;
                userlist.Add(output);
            }
            return userlist;

        }

        [HttpPost]
        public CommonResult UpdateUser(UpdateUserInput input)
        {
            CommonResult commonResult = new CommonResult();

            if (!ModelState.IsValid)
            {
                commonResult.Success = false;
                commonResult.Message = "Validations are failed";

                foreach (var state in ModelState.Values)
                {
                    foreach (var error in state.Errors)
                    {
                        commonResult.Errors.Add(error.ErrorMessage);
                    }
                }

                // 如果验证失败，直接返回结果，不继续执行
                return commonResult;
            }
            var user = new User()
            {
                Id = input.Id,
                Address = input.Address,
                UserName = input.UserName,
                Email = input.Email,
                Phone = input.Phone,
                Gender = input.Gender,
                Password = input.Password,
            };

            var success = this._uerService.UpdateUsers(user); 

            commonResult.Success = success;
            commonResult.Message = success ? "User updated successfully" : "User update failed";

            return commonResult;
        }

        [HttpDelete("{id}")]
        public CommonResult DeleteUser(int id)
        {
            CommonResult commonResult = new CommonResult();
    
            var success = this._uerService.DeleteUser(id);

            commonResult.Success = success;
            commonResult.Message = success ? "User deleted successfully" : "User not found or deletion failed";

            return commonResult;
        }


        #region test api
        [HttpGet]
        public List<UserOutput> GetListTest()
        {

            List<UserOutput> userOutputs = new List<UserOutput>()
           {
                new UserOutput()  { UserName="lily", Email="lily@gmail.com", Address="brisbane"  },
                new UserOutput()  { UserName="tom", Email="tom@gmail.com", Address="brisbane"  },
                new UserOutput()  { UserName="mike", Email="mike@gmail.com", Address="brisbane"  },
           };

            return userOutputs;
        }

        [HttpGet]
        public CommonResult<List<UserOutput>> GetListTest1()
        {
            CommonResult<List<UserOutput>> commonResult = new CommonResult<List<UserOutput>>();
            List<UserOutput> userOutputs = new List<UserOutput>()
           {
                new UserOutput()  { UserName="lily", Email="lily@gmail.com", Address="brisbane"  },
                new UserOutput()  { UserName="tom", Email="tom@gmail.com", Address="brisbane"  },
                new UserOutput()  { UserName="mike", Email="mike@gmail.com", Address="brisbane"  },
           };
            commonResult.Success = true;
            commonResult.Message = "";
            commonResult.Result = userOutputs;
            return commonResult;
        }


        public CommonResult ExceptionTest()
        {
            CommonResult commonResult = new CommonResult();
            int a = 1;
            int b = 0;
            var c = a / b;
            return commonResult;
        }

        #endregion

    }
}
