using Assignment003.Controllers;
using Assignment003.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace Assignment003.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        private readonly ILogger<ExceptionFilter> _logger;
        public ExceptionFilter(ILogger<ExceptionFilter> logger)
        {
            logger = logger;
        }

        public void OnException(ExceptionContext context)
        {

            this._logger.LogError(context.Exception, "ExceptionFilter");

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
