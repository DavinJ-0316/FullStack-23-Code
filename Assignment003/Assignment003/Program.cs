using Assignment003.Config;
using Assignment003.Filters;
using Assignment003.IServices;
using Assignment003.Models;
using Assignment003.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NLog;
using NLog.Web;
using System.Reflection;
using System.Text;

namespace Assignment003
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
            try
            {
                logger.Debug("init main");
                var policyName = "defalutPolicy";

                var builder = WebApplication.CreateBuilder(args);

                // Add services to the container.
                builder.Services.AddTransient<IUerService, UserService>();
             
                builder.Services.AddTransient<CustomActionFilterAttribute>();
                builder.Services.AddTransient<IUerService, UserService>();
                builder.Services.AddTransient<ICategoryService, CategoryService>();
                builder.Services.AddTransient<CreateTokenService>();

                // 禁用默认的模型验证过滤器
                builder.Services.Configure<ApiBehaviorOptions>(options => options.SuppressModelStateInvalidFilter = true);

                builder.Services.AddControllers(options =>
                {
                    //global filter register, working for all actions
                    //options.Filters.Add<ActionFilter>();
                    //options.Filters.Add<ExceptionFilter>();
                    options.Filters.Add<ResultFilter>();
                });

                //配置options方式，后面可以用依赖注入
                builder.Services.Configure<DBConnectionConfig>(builder.Configuration);

                //read DBConnection then use it
                var connectionString = builder.Configuration["DBConnection"];
                var serverVersion = new MySqlServerVersion(new Version(8, 0, 40));//database version
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

                //配置options方式，后面可以用依赖注入
                builder.Services.Configure<JWTConfig>(builder.Configuration.GetSection("JWTConfig"));


                //this jwtConfig need to be used in this program.cs
                var jwtConfig = builder.Configuration.GetSection("JWTConfig").Get<JWTConfig>();

                builder.Services.AddAuthentication("Bearer").
                    AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtConfig.Issuer,
                        ValidateIssuer = true,
                        ValidAudience = jwtConfig.Audience,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtConfig.SecrectKey))
                    };
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

                builder.Services.AddCors(option =>
                {
                    option.AddPolicy(policyName, policy =>
                    {

                        policy.AllowAnyOrigin()       // 允许所有来源
                        .AllowAnyMethod()       // 允许所有 HTTP 方法（GET, POST, PUT, DELETE, etc.）
                        .AllowAnyHeader();      // 允许所有头部
                    });
                });

                //config nlog
                builder.Logging.ClearProviders();
                builder.Host.UseNLog();

                var app = builder.Build();

                // Configure the HTTP request pipeline.
                app.UseCors(policyName);
                app.UseAuthentication();
                app.UseAuthorization();

                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                });

                app.MapControllers();

                app.Run();
            }
            catch (Exception ex)
            {
                logger.Error(ex, "Stopped program becauese of exception");

            }
            finally
            {
                NLog.LogManager.Shutdown();
            }
        }
    }
}
