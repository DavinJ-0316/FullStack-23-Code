using Assignment003.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Assignment003.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
         
            CommonResult commonResult = new CommonResult();
            commonResult.Message = "An error occurred while processing your request.";
            commonResult.Success = false;

#if DEBUG
            commonResult.Errors.Add(context.Exception.Message);
#endif

            // 设置返回的响应状态码和内容
            context.Result = new JsonResult(commonResult)
            {
                StatusCode = 500
            };

            // 标记异常已经被处理
            context.ExceptionHandled = true;
        }
    }
}
