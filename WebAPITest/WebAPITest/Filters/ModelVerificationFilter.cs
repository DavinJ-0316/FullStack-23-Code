using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebAPITest.Filters
{
    public class ModelVerificationFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            Console.WriteLine("ModelVerificationFilter execution after");
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            Console.WriteLine("ModelVerificationFilter vexecution before");
            if (!context.ModelState.IsValid)
            {
                context.Result = new JsonResult("model verfication failed");
            }
        }
    }
}
