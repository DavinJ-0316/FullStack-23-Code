using Microsoft.AspNetCore.Mvc;
using MoocApi.Models;
using System.Text;
using WebAPITest.IService;
using WebAPITest.Models;
using WebAPITest.Service;
using WebAPITest.ViewModel;

namespace WebAPITest.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //传统方式
        //private readonly UserService _userService;

        //public UserController()
        //{
        //    _userService = new UserService();  // 传统的方式，自己创建 UserService 实例
        //}


        //依赖注入方式

        private readonly UserService _userService;

        // 通过构造函数注入 UserService
        //public UserController(UserService userService)
        //{
        //    _userService = userService;
        //}

        //比较scope和transient
        private readonly UserService _userService1;
        private readonly UserService _userService2;
        private readonly TeacherService _teacherService;

        private readonly IUserService _iUserService;
        public UserController(UserService userService1, UserService userService2, TeacherService teacherService,IUserService iuserService)
        {
            _userService1 = userService1;
            _userService2 = userService2;
            _teacherService = teacherService;
            _iUserService = iuserService;
        }

        [HttpGet]
        public IActionResult TestServices()
        {
            // 获取第一个 UserService 实例
            var user1 = _userService1.GetUserByName("lily");

            // 获取第二个 UserService 实例
            var user2 = _userService2.GetUserByName("mike");

            // 获取 TeacherService，并通过它再次使用 UserService
            var userFromTeacherService = _teacherService.GetUser("tom");

            return Ok(new
            {
                UserService1 = user1,
                UserService2 = user2,
                UserFromTeacherService = userFromTeacherService
            });
        }

        #region advance


        //ITeacherService _teacherService;
        //IEnumerable<ITeacherService> _teacherServices;
        //public UserController(ITeacherService teacherService, IEnumerable<ITeacherService> teacherServices)
        //{
        //    this._teacherService = teacherService;

        //   this._teacherServices = teacherServices;
        //}

        //ITeacherService _teacherService;
        //IServiceProvider _serviceProvider;
        //UserServiceDB _userServiceDB;
        //public UserController(IServiceProvider serviceProvider, UserServiceDB userServiceDB)
        //{
        //    //his._teacherService = teacherService;

        //    this._serviceProvider = serviceProvider;
        //    this._userServiceDB = userServiceDB;
        //}

        #endregion


        //连接数据库
        //[HttpPost]
        //public CommonResult<bool> AddUserDb(User user)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var isSuccess = this._userServiceDB.Insert(user);
        //        return new CommonResult<bool>() { IsSucess = isSuccess };
        //    }
        //    return new CommonResult<bool>() { IsSucess = false,Message="model validation failed" };
        //}

        public CommonResult<List<User>> GetUserfromDB()
        {
           var user=this._iUserService.GetAll();
            return new CommonResult<List<User>>() { IsSucess = true, Message = "", Result = user };
        }

        #region advance DI 的应用

        //[HttpGet]
        //public JsonResult TestITeacherService()
        //{
        //    //var teacher = this._teacherService.GetTeacher();

        //    //var fristservice =this._teacherServices.First();
        //    //return new JsonResult(fristservice.GetTeacher());

        //    var fristservice = this._serviceProvider.GetRequiredKeyedService<ITeacherService>("server1");
        //    return new JsonResult(fristservice.GetTeacher());
        //}

        [HttpGet]
        public JsonResult GetTeacherName()
        {
            return new JsonResult(this._teacherService.GetUser("lily"));
        }

        //[HttpDelete]
        //public JsonResult DeleteUsers()
        //{
        //    this._teacherService.DeleteAll();
        //    return new JsonResult(true);
        //}

        #endregion


        [HttpGet]
        public JsonResult GetUserInfo()
        {
            var userInfo = new { name = "lily", age = 30, address = "Brisbane", postcode = "1234" };
            return new JsonResult(userInfo);
        }

        [HttpGet]
        //[Route("test/getinfo")]
        public JsonResult GetSpecificUserInfo()
        {
            var userInfo = new { name = "lucy", age = 30, address = "Brisbane", postcode = "1234" };
            return new JsonResult(userInfo);
        }

        //[HttpGet("{id1}")]

        [HttpGet("{id}")]
        public JsonResult GetUserInfobyId(int id)//one parameter
        {
            var userInfo = new { id = id, name = "lily", age = 30, address = "Brisbane", postcode = "1234" };
            return new JsonResult(userInfo);
        }

        [HttpGet("{id}/{name}")]// pass multiple parms in router
        public JsonResult GetUserInfobyMultiParams(int id, string name)
        {
            var userInfo = new { id = id, name = name, age = 30, address = "Brisbane", postcode = "1234" };
            return new JsonResult(userInfo);
        }

        [HttpGet("{id}-{name}")]// pass multiple parms(not only using "/" but also any) in router--try by yourself
        public JsonResult GetUserInfobyMultiParamsAnother(int id, string name)
        {
            var userInfo = new { id = id, name = name, age = 30, address = "Brisbane", postcode = "1234" };
            return new JsonResult(userInfo);
        }


        [Route("test/say/{id}/{name}")]//parameters must be here
        [HttpGet]// pass parms in router,not support for passing params via router 
        public JsonResult GetUserInfobyMultiParamsAnother1(int id, string name)
        {
            var userInfo = new { id = id, name = name, age = 30, address = "Brisbane", postcode = "1234" };
            return new JsonResult(userInfo);
        }

        public JsonResult GetUserInfobyIdandName(int id, string name)//Query String Parameters
        {
            var userInfo = new { id = id, name = "lily", age = 30, address = "Brisbane", postcode = "1234" };
            return new JsonResult(userInfo);
        }

        [HttpPost] //default path
        public JsonResult AddUser([FromBody] User user)
        {

            return new JsonResult(user);
        }

        [HttpPost] //default path
        public CommonResult<User> AddUserT([FromBody] User user)
        {

            return new CommonResult<User>() { IsSucess = true, Message = "scuss", Result = user };
        }

        [HttpPost]
        public JsonResult AddUserfromForm([FromForm] User user)
        {
            return new JsonResult(user);
        }

        //upload file
        [HttpPost]
        public JsonResult AddUserFromFile(IFormFile file)
        {

            return new JsonResult(file);
        }

        //统一返回 非泛型
        [HttpGet]
        public CommonResult GetCommonResult()
        {
            //object
            CommonResult result = new CommonResult();
            //result.Result = "Hello";  // 这是一个 string
            result.Result = "123";

            return new CommonResult() { IsSucess = true, Message = "", Result = result.Result };

        }

        [HttpGet]
        //统一返回 泛型
        public CommonResult<string> GetCommonResultT()
        {
            CommonResult<string> result = new CommonResult<string>();
            result.Result = "Hello";  // 这是一个 string
            string message = result.Result;  // 无需类型转换，编译器会检查类型

            return new CommonResult<string> { IsSucess = true, Message = message, Result = result.Result };
        }



        [HttpGet]
        public async Task<CommonResult<string>> GetCommonResultTAsync()
        {
            CommonResult<string> result = new CommonResult<string>();
            result.Result = "Hello";  // 这是一个 string
            string message = result.Result;  // 无需类型转换，编译器会检查类型

            return await Task.FromResult(result);

            //return await Task.Run(() =>
            //{
            //    return new CommonResult<string> { IsSucess = true, Message = message, Result = result.Result };
            //});
        }

        [HttpPost]
        public CommonResult<User> AddUserWithValidation([FromForm] User user)
        {
            //model validation
            if (ModelState.IsValid)
            {
                //return new CommonResult() { IsSucess = true, Message = "scuss" };

                return new CommonResult<User>() { IsSucess = true, Message = "scuss", Result = user };
            }
            else
            {
                StringBuilder stringBuilder = new StringBuilder();
                foreach (var item in ModelState.Keys)
                {

                    stringBuilder.Append(item + ":");
                    if (ModelState[item].Errors != null && ModelState[item].Errors.Count > 0)
                    {
                        foreach (var errors in ModelState[item].Errors)
                        {
                            stringBuilder.Append(errors.ErrorMessage);
                            stringBuilder.Append("");
                        }
                        stringBuilder.AppendLine();
                    }
                }
                // return new CommonResult() { IsSucess = false, Message = stringBuilder.ToString() };
                return new CommonResult<User>() { IsSucess = false, Message = stringBuilder.ToString(), Result = user };
            }
        }
    }
}
