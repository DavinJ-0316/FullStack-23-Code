using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Exceptions;

namespace WebAPI.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var errorResult = new CommonResult<object>
            {
                IsSuccess = false,
               
            };
            if (context.Exception is BusinessException businessException)
            {
                errorResult.Message = businessException.Message;
                errorResult.Errors = new List<string>() { businessException.Message };    
            }
            else
            {
                errorResult.Message = "One or more errors occurred while processing your request.";
                errorResult.Errors = new List<string> { context.Exception.Message };
            }
           

            context.Result = new ObjectResult(errorResult)
            {
                StatusCode = 500
            };

            context.ExceptionHandled = true;
        }
    }
}
