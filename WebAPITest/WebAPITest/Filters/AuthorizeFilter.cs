using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using WebAPITest.Models;
using WebAPITest.ViewModel;

namespace WebAPITest.Filters
{
    public class AuthorizeFilter : IAsyncAuthorizationFilter
    {
        private MoocDBContext _moocDBContext;
        public AuthorizeFilter(MoocDBContext moocDBContext)
        {
            this._moocDBContext = moocDBContext;
        }


        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var actionDescriptor = context.ActionDescriptor as ControllerActionDescriptor;
            if (actionDescriptor != null)
            {
                var controllsAllow = actionDescriptor.ControllerTypeInfo.GetCustomAttributes(typeof(AllowAnonymousAttribute), true);
                if (controllsAllow.Any())
                    return;


                var actionAllo = actionDescriptor.MethodInfo.GetCustomAttributes(typeof(AllowAnonymousAttribute), true);
                if (actionAllo.Any())
                    return;

                if (context.HttpContext.User?.Identity?.IsAuthenticated == false)
                {
                    CommonResult commonResult = new CommonResult();
                    commonResult.IsSucess = false;
                    commonResult.Message = "";
                    context.HttpContext.Response.StatusCode = 401;
                    context.Result = new JsonResult(commonResult);
                }
                else
                {
                    var PermissionCodeList = actionDescriptor.MethodInfo.GetCustomAttributes(typeof(PermissionCodeAttribute), true);
                    if (!PermissionCodeList.Any())
                        return;

                    var userClaim = context.HttpContext.User.FindFirst(x => x.Type == "UserId");
                    if (userClaim == null)
                    {
                        CommonResult commonResult = new CommonResult();
                        commonResult.IsSucess = false;
                        commonResult.Message = "token doesn't include user i";
                        context.HttpContext.Response.StatusCode = 401;
                        context.Result = new JsonResult(commonResult);

                    }
                    else
                    {
                        var userId = int.Parse(userClaim.Value);
                        var user = await this._moocDBContext.UserEF.Include(x => x.UserRoles).FirstOrDefaultAsync(x => x.Id == userId);
                        if (user == null)
                        {
                            CommonResult commonResult = new CommonResult();
                            commonResult.IsSucess = false;
                            commonResult.Message = "can't find this user";
                            context.HttpContext.Response.StatusCode = 403;
                            context.Result = new JsonResult(commonResult);
                        }
                        else
                        {
                            var permissionCodeAttribute = PermissionCodeList[0] as PermissionCodeAttribute;
                            var permissonCode = permissionCodeAttribute.Code;
                            var roleIdList = user.UserRoles.Select(x => x.RoleId).ToList();
                            var rolePermisssList = await this._moocDBContext.RolePermission.Include(x => x.Permission).Where(x => roleIdList.Contains(x.RoleId)).ToListAsync();
                            var rolePermissionCodeList = rolePermisssList.Select(x => x.Permission.PermissionCode).ToList();
                            if (!rolePermissionCodeList.Contains(permissonCode))
                            {
                                CommonResult commonResult = new CommonResult();
                                commonResult.IsSucess = false;
                                commonResult.Message = "no aouthorize";
                                context.HttpContext.Response.StatusCode = 403;
                                context.Result = new JsonResult(commonResult);
                            }
                        }

                    }
                }
            }
        }
    }
}
