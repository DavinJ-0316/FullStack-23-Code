using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DavinAssignement3.Filters
{
    public class ResultFilter : IResultFilter
    {
        /*        public void OnResultExecuting(ResultExecutingContext context)
                {
                    if (context.Result is JsonResult jsonResult)
                    {
                        jsonResult.Value = new
                        {
                            UserEmail = "result filter",
                            Hacked = "???????????????",
                            Compromised = "?????????????",
                        };

                        var result = new CommonResult<string>()
                        {
                            IsSuccess = true,
                            Data = jsonResult.Value.ToString(),
                            TimeStamp = DateTime.UtcNow,
                        };
                        context.Result = new JsonResult(result);
                    }
                }*/

        public void OnResultExecuting(ResultExecutingContext context)
        {
            if (context.Result is JsonResult jsonResult)
            {
                // Get the original data
                var originalData = jsonResult.Value;

                // Create a new result object that includes the original data and the additional fields
                var result = new
                {
                    IsSuccess = true,
                    OriginalData = originalData,
                    TimeStamp = DateTime.UtcNow,
                    IsChangedByResultFilter = true
                };

/*                    new CommonResult<object>()
                {
                    IsSuccess = true,
                    Data = new
                    {
                        OriginalData = originalData,
                        TimeStamp = DateTime.UtcNow,
                        IsChangedByResultFilter = true
                    },
                    TimeStamp = DateTime.UtcNow
                };*/

                // Set the new result
                context.Result = new JsonResult(result);
            }
        }

        public void OnResultExecuted(ResultExecutedContext context)
        {

        }
    }
}
