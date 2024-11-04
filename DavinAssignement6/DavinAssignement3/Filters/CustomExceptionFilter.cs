using DavinAssignement3.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DavinAssignement3.Filters
{
    public class CustomExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var exception = context.Exception;

            var result = new CommonResult<string>
            {
                IsSuccess = false,
                Message = exception.Message,
                TimeStamp = DateTime.UtcNow,
            };

            context.Result = new JsonResult(result)
            {
                StatusCode = 500,
            };

            context.ExceptionHandled = true;
        }
    }
}
