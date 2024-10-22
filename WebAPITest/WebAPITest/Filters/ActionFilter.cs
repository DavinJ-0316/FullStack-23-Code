using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text;

namespace WebAPITest.Filters
{
    //Action Filters
    //IAsyncActionFilter,IActionFilter, both are ok
    public class ActionFilter : IActionFilter//IAsyncActionFilter 
    {
        //before or after executing an action—AOP (Aspect-Oriented Programming).
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var actionDescriptor = context.ActionDescriptor as ControllerActionDescriptor;
            if (actionDescriptor != null)
            {
                var query = context.HttpContext.Request.Query;
                StringBuilder stringBuilder = new StringBuilder();
                var method = context.HttpContext.Request.Method.ToString();
                stringBuilder.Append(method);
                var param = actionDescriptor.Parameters;
                //http://localhost:5211/action/Index?name=liiy
                foreach (var parameter in query)
                {
                    stringBuilder.AppendFormat("  parameter.key:{0} value:{1}", parameter.Key, parameter.Value);
                }
                Console.WriteLine(stringBuilder.ToString());
            }
            //before execution
            Console.WriteLine("ActionFilter vexecution before");
           // await next();
            //after execution
            Console.WriteLine("ActionFilter execution after");

        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var actionDescriptor = context.ActionDescriptor as ControllerActionDescriptor;
            if (actionDescriptor != null)
            {
                var query = context.HttpContext.Request.Query;
                StringBuilder stringBuilder = new StringBuilder();
                var method = context.HttpContext.Request.Method.ToString();
                stringBuilder.Append(method);
                var param = actionDescriptor.Parameters;
                //http://localhost:5211/action/Index?name=liiy
                foreach (var parameter in query)
                {
                    stringBuilder.AppendFormat("  parameter.key:{0} value:{1}", parameter.Key, parameter.Value);
                }
                Console.WriteLine(stringBuilder.ToString());
            }

            // 在Action执行之前执行的逻辑
            //Console.WriteLine("Action is executing.");
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // 在Action执行之后执行的逻辑
            Console.WriteLine("Action has executed.");
        }
    }
}
