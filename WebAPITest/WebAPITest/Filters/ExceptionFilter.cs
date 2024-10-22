using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebAPITest.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            // 创建一个标准的错误响应
            var errorResponse = new
            {
                Message = "An error occurred while processing your request.",
                Detail = context.Exception.Message,
                Timestamp = DateTime.UtcNow
            };

            // 设置返回的响应状态码和内容
            context.Result = new JsonResult(errorResponse)
            {
                StatusCode = 500
            };

            // 标记异常已经被处理
            context.ExceptionHandled = true;
        }
    }
}
