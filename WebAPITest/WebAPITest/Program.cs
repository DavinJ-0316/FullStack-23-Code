using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using NLog.Web;
using WebAPITest.Controllers;
using WebAPITest.Filters;
using WebAPITest.IService;
using WebAPITest.Models;
using WebAPITest.Service;
using NLog;
using System;
using WebAPITest.Config;
using WebAPITest.Init;
using Microsoft.Extensions.Configuration;
using System.Reflection;
using Microsoft.OpenApi.Models;
using System.Security.Cryptography.Xml;


namespace WebAPITest
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
            logger.Debug("init main");
            var policyName = "defalutPolicy";

            try
            {
                var builder = WebApplication.CreateBuilder(args);
                //builder.Services.AddMemoryCache();//for cache

                //瞬时  
                //builder.Services.AddTransient<UserService>();
                //builder.Services.AddTransient<TeacherService>();

                //作用域
                //builder.Services.AddScoped<UserService>();
                //builder.Services.AddScoped<TeacherService>();

                //单例
                //builder.Services.AddSingleton<UserService>();
                //builder.Services.AddSingleton<TeacherService>();


                builder.Services.AddScoped<UserService>();
                builder.Services.AddTransient<TeacherService>();

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


                // builder.Services.AddTransient<TeacherService>();
                builder.Services.AddTransient<UserServiceDB>();
                //builder.Services.AddTransient<IUserService, UserServiceDB>();
                builder.Services.AddTransient<IUserService, UserServiceEF>();
                builder.Services.AddTransient<ICategoryService, CourseCategoryService>();
                builder.Services.AddTransient<ICourseService, CoursesService>();

                #endregion

                var serverVersion = new MySqlServerVersion(new Version(8, 0, 40));//database version

                var connectionString = builder.Configuration["DBConnection"];
                // Replace 'YourDbContext' with the name of your own DbContext derived class.
                builder.Services.AddDbContext<MoocDBContext>(
                    dbContextOptions => dbContextOptions
                        .UseMySql(connectionString, serverVersion)
                        // The following three options help with debugging, but should
                        // be changed or removed for production.
                        .LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information)
                        .EnableSensitiveDataLogging()
                        .EnableDetailedErrors()
                );


                //builder.Configuration.GetSection("DBConnection").Bind();


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
                    options.Filters.Add<AuthorizeFilter>();
                }).AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                });

                builder.Services.Configure<JWTConfig>(builder.Configuration.GetSection(JWTConfig.Section));

                var jwtConfig = builder.Configuration.GetSection(JWTConfig.Section).Get<JWTConfig>();

                builder.Services.AddJWT(jwtConfig);

                builder.Services.AddTransient<CreateTokenService>();

                builder.Services.AddCors(option =>
                {
                    option.AddPolicy(policyName, policy =>
                    {

                        policy.AllowAnyOrigin()       // 允许所有来源
                        .AllowAnyMethod()       // 允许所有 HTTP 方法（GET, POST, PUT, DELETE, etc.）
                        .AllowAnyHeader();      // 允许所有头部
                    });
                });

                //config swagger
                builder.Services.AddSwaggerGen(options =>
                {
                    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo()
                    {
                        Title = "My First Web Api Project",
                        Version = "v1",
                        Description = "This is my First Web Api Project",
                        Contact = new Microsoft.OpenApi.Models.OpenApiContact() { Name = "lily", Url = new Uri("https://google.com") }
                    });

                    var xmlFileName = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFileName), true);

                    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
                    {
                        Description = "",
                        Name = "Authorization",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.ApiKey,
                        Scheme = "Bearer"
                    });

                    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
                    {
                        {

                        new OpenApiSecurityScheme()
                        {
                            Reference=new OpenApiReference()
                            {
                                 Type=ReferenceType.SecurityScheme,
                                 Id="Bearer"
                            }
                        },
                        new List<string>()
                          }
                    });

                });
                Console.WriteLine("Environment: {0}", builder.Environment.EnvironmentName);

                // NLog: Setup NLog for Dependency injection
                builder.Logging.ClearProviders();
                builder.Host.UseNLog();

                //var key1 = builder.Configuration["key1"];
                //Console.WriteLine("key1: {0}", key1);

                var app = builder.Build();

                // Configure the HTTP request pipeline.
                app.UseCors(policyName);

                app.UseSwagger(); // 生成 Swagger 文档
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                });

                app.UseAuthentication();
                app.UseAuthorization();


                app.MapControllers();

                //UserService userService = new UserService();
                //TeacherService teacherService = new TeacherService(userService);
                //UserController userController = new UserController(teacherService);
                //var c= userController.GetTeacherName();
                app.Run();
            }
            catch (Exception ex)
            {
                // NLog: catch setup errors
                logger.Error(ex, "Stopped program because of exception");
                throw;
            }
            finally
            {
                // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
                NLog.LogManager.Shutdown();
            }
        }
    }
}
