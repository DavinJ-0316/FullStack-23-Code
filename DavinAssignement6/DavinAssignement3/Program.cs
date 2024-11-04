using Microsoft.AspNetCore.Mvc;
using DavinAssignement3.Filters;
using DavinAssignement3.Config;
using DavinAssignement3.Services;
using DavinAssignement3.IServices;
using DavinAssignement3.Init;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebAPITest.Filters;
using DavinAssignement3.Model;
using Microsoft.OpenApi.Models;
using System.Reflection;
using NLog.Web;

namespace DavinAssignement3
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var policyName = "defalutPolicy";
            // Add services to the container.

            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<ICategoryService, CourseCategoryService>();
            builder.Services.AddTransient<ICourseService, CoursesService>();

            var serverVersion = new MySqlServerVersion(new Version(9, 1, 0));//database version

            var connectionString = builder.Configuration["DBConnection"];

            builder.Services.AddDbContext<DavinDBContext>(
                dbContextOptions => dbContextOptions
                    .UseMySql(connectionString, serverVersion)
                    .LogTo(Console.WriteLine, LogLevel.Information)
                    .EnableSensitiveDataLogging()
                    .EnableDetailedErrors()
                );
            
            builder.Services.AddControllers(options =>
            {
                options.Filters.Add<ActionFilter>();
                options.Filters.Add<CustomExceptionFilter>();
                /*options.Filters.Add<ModelVerificationFilter>();*/
                options.Filters.Add<ResultFilter>();
            }).AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
            });

            builder.Services.Configure<DBConnectionConfig>(builder.Configuration);

            // disabled built-in error format when error occur
            builder.Services.Configure<ApiBehaviorOptions>(options => options.SuppressModelStateInvalidFilter = true);

            builder.Services.Configure<JWTConfig>(builder.Configuration.GetSection(JWTConfig.Section));

            // Register CreateTokenService
            builder.Services.AddTransient<CreateTokenService>();

            builder.Services.AddCors(option =>
            {
                option.AddPolicy(policyName, policy =>
                {
                    policy.AllowAnyOrigin()
                           .AllowAnyMethod()
                            .AllowAnyHeader();
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
                    Contact = new Microsoft.OpenApi.Models.OpenApiContact() { Name = "davin", Url = new Uri("https://google.com") }
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

            var jwtConfig = builder.Configuration.GetSection(JWTConfig.Section).Get<JWTConfig>();

            builder.Services.AddJWT(jwtConfig);


            // NLog: Setup NLog for Dependency injection
            builder.Logging.ClearProviders();
            builder.Host.UseNLog();

            var app = builder.Build();

            app.UseCors(policyName);

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            });

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            // must have and must be above the UseAuthorization, login first, check role second
            // if UseAuthentication does not exist, then jwt restriction will not be applied
            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
