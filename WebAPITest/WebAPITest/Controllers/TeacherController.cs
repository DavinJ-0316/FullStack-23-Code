using Microsoft.AspNetCore.Mvc;
using MoocApi.Models;
using System.Text;
using WebAPITest.ViewModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPITest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        // GET: api/<TeacherController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //error handling

        [HttpGet]
        public IEnumerable<string> Get()
        {
            throw new NotImplementedException();
        }

        // GET api/<TeacherController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        //// POST api/<TeacherController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{

        //}

        // POST api/<TeacherController>
        [HttpPost]
        public CommonResult<Teacher> Post([FromBody]Teacher teacher)
        {
            //model validation
            if (ModelState.IsValid)
            {
                //return new CommonResult() { IsSucess = true, Message = "scuss" };

                return new CommonResult<Teacher>() { IsSucess = true, Message = "scuss", Result = teacher };
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
                return new CommonResult<Teacher>() { IsSucess = false, Message = stringBuilder.ToString(), Result = teacher };
            }
        }

        // PUT api/<TeacherController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TeacherController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
