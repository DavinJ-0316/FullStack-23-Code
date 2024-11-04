using Microsoft.AspNetCore.Mvc.Filters;

namespace Assignment003.Filters
{
    public class CustomActionFilterAttribute : ActionFilterAttribute
    {
        private readonly ILogger<CustomActionFilterAttribute> _logger;
        public CustomActionFilterAttribute(ILogger<CustomActionFilterAttribute>  logger)
        {
            this._logger = logger;
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
           
        }


        public override void OnActionExecuted(ActionExecutedContext context)
        {
            
        }
    }

}
