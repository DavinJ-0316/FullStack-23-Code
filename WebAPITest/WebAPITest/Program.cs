using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using WebAPITest.Controllers;
using WebAPITest.Filters;
using WebAPITest.IService;
using WebAPITest.Models;
using WebAPITest.Service;

namespace WebAPITest
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            //builder.Services.AddMemoryCache();//for cache
            //scope                                  
            builder.Services.AddScoped<UserService>();

            //create a new object each request--Transient    
            //builder.Services.AddTransient<UserService>();
            //builder.Services.AddTransient<TeacherService>();

            ////作用域
            //builder.Services.AddScoped<UserService>();
            //builder.Services.AddScoped<TeacherService>();

            #region advance DI

            //create only one object during running
            //builder.Services.AddSingleton<TeacherService>();
            //builder.Services.AddSingleton<UserService>();


            //builder.Services.AddTransient<ITeacherService, TeacherService>();
            //builder.Services.AddTransient<ITeacherService, TeacherService1>();
            //builder.Services.AddTransient<UserService>();

            //builder.Services.AddKeyedTransient<ITeacherService, TeacherService>("server1");
            //builder.Services.AddKeyedTransient<ITeacherService, TeacherService1>("server2");
            //builder.Services.AddTransient<UserService>();
            //builder.Services.AddTransient<UserServiceDB>();


            builder.Services.AddTransient<TeacherService>();
            builder.Services.AddTransient<UserServiceDB>();
            builder.Services.AddTransient<IUserService, UserServiceDB>();
            builder.Services.AddTransient<ICategoryService, CourseCategoryService>();

            #endregion

            var serverVersion = new MySqlServerVersion(new Version(8, 0, 40));//database version
            var connectionString = builder.Configuration["DBConnection"];
            // Replace 'YourDbContext' with the name of your own DbContext derived class.
            builder.Services.AddDbContext<MoocDBContext>(
                dbContextOptions => dbContextOptions
                    .UseMySql(connectionString, serverVersion)
                    // The following three options help with debugging, but should
                    // be changed or removed for production.
                    .LogTo(Console.WriteLine, LogLevel.Information)
                    .EnableSensitiveDataLogging()
                    .EnableDetailedErrors()
            );

            // 禁用默认的模型验证过滤器

            builder.Services.Configure<ApiBehaviorOptions>(options => options.SuppressModelStateInvalidFilter = true);

            builder.Services.AddControllers(options =>
            {
                //global filter register, working for all actions
                //options.Filters.Add<ResourceFilter>();
                //options.Filters.Add<ActionFilter>();
                //options.Filters.Add<ModelVerificationFilter>();
                //options.Filters.Add<ResultFilter>();
                //options.Filters.Add<ExceptionFilter>();
            });

            Console.WriteLine("Environment: {0}", builder.Environment.EnvironmentName);

            var key1 = builder.Configuration["key1"];
            Console.WriteLine("key1: {0}", key1);

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseAuthorization();

            app.MapControllers();

            //UserService userService = new UserService();
            //TeacherService teacherService = new TeacherService(userService);
            //UserController userController = new UserController(teacherService);
            //var c= userController.GetTeacherName();
            app.Run();
        }
    }
}
