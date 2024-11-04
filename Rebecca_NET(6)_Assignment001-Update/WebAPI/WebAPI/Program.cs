using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NLog;
using NLog.Web;
using System.Text;
using WebAPI.Filters;
using WebAPI.IServices;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var logger = NLog
                .LogManager.Setup()
                .LoadConfigurationFromAppSettings()
                .GetCurrentClassLogger();
            logger.Debug("init main");

            try
            {
                var builder = WebApplication.CreateBuilder(args);

                // Add services to the container.
                builder.Services.AddTransient<ICategoryService, CategoryService>();
                builder.Services.AddTransient<ICourseService, CourseService>();
                builder.Services.AddTransient<IAuthService, AuthService>();
                builder.Services.AddTransient<IUserService, UserService>();

                builder.Services.AddControllers(options =>
                {
                    options.Filters.Add<ExceptionFilter>();
                    options.Filters.Add<ResultFilter>();
                });

                // NLog: Setup NLog for Dependency injection
                builder.Logging.ClearProviders();
                builder.Host.UseNLog();

                builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddSwaggerGen(options =>
                {
                    options.AddSecurityDefinition(
                        "Bearer",
                        new OpenApiSecurityScheme
                        {
                            Name = "Authorization",
                            Type = SecuritySchemeType.Http,
                            Scheme = "bearer",
                            BearerFormat = "JWT",
                            In = ParameterLocation.Header,
                            Description = "Please enter Bearer JWT into field",
                        }
                    );

                    options.AddSecurityRequirement(
                        new OpenApiSecurityRequirement
                        {
                            {
                                new OpenApiSecurityScheme
                                {
                                    Reference = new OpenApiReference
                                    {
                                        Type = ReferenceType.SecurityScheme,
                                        Id = "Bearer",
                                    },
                                },
                                new string[] { }
                            },
                        }
                    );
                });

                var connectionString = builder.Configuration["DBConnection"];
                builder.Services.AddDbContext<DBContext>(options =>
                    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
                );

                var jwtSettings = builder.Configuration.GetSection("JwtSettings");

                builder
                    .Services.AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                    .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters =
                            new TokenValidationParameters
                            {
                                ValidateIssuer = true,
                                ValidateAudience = true,
                                ValidateLifetime = true,
                                ValidateIssuerSigningKey = true,
                                ValidIssuer = jwtSettings["Issuer"],
                                ValidAudience = jwtSettings["Audience"],
                                IssuerSigningKey = new SymmetricSecurityKey(
                                    Encoding.UTF8.GetBytes(jwtSettings["SecretKey"])
                                ),
                            };
                    });

                builder.Services.AddAuthorization();

                var app = builder.Build();

                // Configure the HTTP request pipeline.

                if (builder.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI(options =>
                    {
                        options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                        options.RoutePrefix = "swagger";
                    });
                }

                app.UseAuthentication();

                app.UseAuthorization();

                app.MapControllers();

                app.Run();
            }
            catch (Exception exception)
            {
                // NLog: catch setup errors
                logger.Error(exception, "Stopped program because of exception");
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
