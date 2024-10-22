    using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;

namespace WebAPITest.Filters
{
    //https://www.cnblogs.com/topguntopgun/p/16001747.html
    //缓存，在没有实例化control前就可以执行,程序的缓存，区别：浏览器缓存，全局，不需要在controller 或者action加标签
    public class ResourceFilter : IResourceFilter
    {
        private readonly IMemoryCache _memoryCache;
        public ResourceFilter(IMemoryCache memoryCache)
        {
            this._memoryCache = memoryCache;
        }

        //private static Dictionary<string, object> _cache = new Dictionary<string, object>();
        public void OnResourceExecuted(ResourceExecutedContext context)
        {
            var actionDescriptor = context.ActionDescriptor as ControllerActionDescriptor;
            if (actionDescriptor != null)
            {
                var key = actionDescriptor.ControllerName + actionDescriptor.ActionName;
                var cacheData = this._memoryCache.Get<object>(key);
                if (cacheData == null)
                {
                    this._memoryCache.Set(key, context.Result,TimeSpan.FromSeconds(300));
                }
            }


            Console.WriteLine("OnAuthorization OnResourceExecuted");
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {           
            var actionDescriptor = context.ActionDescriptor as ControllerActionDescriptor;
            if (actionDescriptor != null)
            {
                var key = actionDescriptor.ControllerName + actionDescriptor.ActionName;
                var cacheData = this._memoryCache.Get<object>(key);
                if (cacheData!=null)
                {
                    context.Result = (IActionResult)cacheData;
                }
            }
            Console.WriteLine("OnAuthorization OnResourceExecuting");
        }
    }
}
