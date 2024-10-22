using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MoocApi.Models;
using System.Numerics;
using System.Reflection;
using WebAPITest.Models;

namespace WebAPITest.Filters
{
    public class ResultFilter : IResultFilter//IAsyncResultFilter
    {
        public void OnResultExecuted(ResultExecutedContext context)
        {
            //throw new NotImplementedException();
        }

        public void OnResultExecuting(ResultExecutingContext context)
        {
            //在结果执行之前进行操作
                if (context.Result is JsonResult jsonResult)
            {
                // 这里你可以修改返回的结果
                jsonResult.Value = new { Id = 3, UserName = "Lucy", Adress = "India", Email = "lily@gmail.com", Gender = GenderEnum.F, Password = "123", Phone = "0923455" };
            }
        }

        //public async Task OnResultExecutionAsync(ResultExecutingContext context, ResultExecutionDelegate next)
        //{
        //    // 在结果执行之前进行操作
        //    if (context.Result is JsonResult jsonResult)
        //    {
        //        // 这里你可以修改返回的结果
        //        jsonResult.Value = new { Id = 3, UserName = "Lucy", Adress = "India", Email = "lily@gmail.com", Gender = GenderEnum.F, Password = "123", Phone = "0923455" };
        //    }
        //}
    }
}
