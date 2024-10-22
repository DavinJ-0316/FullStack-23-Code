using Microsoft.AspNetCore.Mvc.Filters;

namespace WebAPITest.Filters
{
    public class PartialActionFilterAttribute: ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            Console.WriteLine("PartialActionFilterAttribute execution after");

        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Console.WriteLine("PartialActionFilterAttribute execution before");
        }
    }
}
