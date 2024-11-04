using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WebAPI.Models;

public class ResultFilter : IResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context)
    {
        if (context.Result is ObjectResult objectResult)
        {
            if (objectResult.Value == null)
            {
                return;
            }

            var isSuccess = objectResult.StatusCode >= 200 && objectResult.StatusCode < 300;

            var commonResult = new CommonResult<object>
            {
                IsSuccess = isSuccess,
                Message = isSuccess
                    ? "Request processed successfully"
                    : "One or more errors occured.",
                Result = isSuccess ? objectResult.Value : null,
                Errors = isSuccess ? null : (objectResult.Value as CommonResult)?.Errors,
            };

            context.Result = new ObjectResult(commonResult);
        }
    }

    public void OnResultExecuted(ResultExecutedContext context) { }
}
