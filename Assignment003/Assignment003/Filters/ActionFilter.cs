using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text;

namespace Assignment003.Filters
{
    public class ActionFilter : IActionFilter
    {
        private readonly ILogger<ActionFilter> _logger;
        public ActionFilter(ILogger<ActionFilter> logger)
        {
            this._logger = logger;
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {

        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var controllType = context.Controller.GetType();

            var controllerName = controllType.Name;

            var controllerActionDescriptor = context.ActionDescriptor as ControllerActionDescriptor;
            if (controllerActionDescriptor != null)
            {
                StringBuilder stringBuilder = new StringBuilder();
                var actionName = controllerActionDescriptor.ActionName;
                var parameters = controllerActionDescriptor.MethodInfo.GetParameters();

                foreach (var parameter in parameters)
                {
                    // 从 context.ActionArguments 中获取当前参数的值
                    if (context.ActionArguments.TryGetValue(parameter.Name, out var value))
                    {
                        Console.WriteLine("Action: {0}, Parameter: {1}, Value: {2}", actionName, parameter.Name, value);
                    }
                    else
                    {
                        Console.WriteLine("Action: {0}, Parameter: {1}, Value: null", actionName, parameter.Name);
                    }
                }

            }
        }
    }
}
