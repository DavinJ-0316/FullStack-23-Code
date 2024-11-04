using Microsoft.AspNetCore.Mvc.Filters;
using System.Text;

namespace DavinAssignement3.Filters
{
    // public class PartialActionFilterAttribute : ActionFilterAttribute
    public class ActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            string actionName = context.ActionDescriptor.DisplayName ?? "Invalid action";

            var queryParams = context.HttpContext.Request.Query;

            var bodyParams = context.HttpContext.Request.Body;

            Console.WriteLine($"action name is: {actionName}");

            if(queryParams != null)
            {
                Console.WriteLine($"query params: ");

                foreach (var param in queryParams)
                {
                    Console.WriteLine($"key is: {param.Key} and value is {param.Value}");
                }
            }

            if (bodyParams != null)
            {
                // Question: why do I only get body data of get request not from post and put request?


                // Enable buffering to read the request body multiple times
                context.HttpContext.Request.EnableBuffering();

                using (var reader = new StreamReader(bodyParams, Encoding.UTF8, leaveOpen: true))
                {
                    var bodyTask = reader.ReadToEndAsync();
                    bodyTask.Wait(); // Wait for the async read to complete
                    var body = bodyTask.Result;
                    Console.WriteLine($"Body params: {body}");

                    // Reset the stream position to allow further reading
                    context.HttpContext.Request.Body.Position = 0;
                }
            }
        }
    }
}
