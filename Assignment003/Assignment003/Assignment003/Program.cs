using Assignment003.Config;
using Assignment003.Filters;
using Assignment003.IServices;
using Assignment003.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;

namespace Assignment003
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddTransient<IUerService, UserService>();
            //����options��ʽ���������������ע��
            builder.Services.Configure<DBConnectionConfig>(builder.Configuration);

            // ����Ĭ�ϵ�ģ����֤������
            builder.Services.Configure<ApiBehaviorOptions>(options => options.SuppressModelStateInvalidFilter = true);

            builder.Services.AddControllers(options =>
            {
                //global filter register, working for all actions
                //options.Filters.Add<ActionFilter>();
                //options.Filters.Add<ExceptionFilter>();
                options.Filters.Add<ResultFilter>();
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
