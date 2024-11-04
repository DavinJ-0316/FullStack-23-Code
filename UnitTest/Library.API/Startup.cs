using Library.API.Config;
using Library.API.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Library.API
{
    public class Startup
    {
        private ApplicationSettings _appSettings;
        private MockSetting _mockSetting;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //依赖注入config的方法一： 调用Config.Bind(); 但是需要先初始化一个空的对象
            _appSettings = new ApplicationSettings();
            _mockSetting = new MockSetting();

            Configuration.Bind(nameof(ApplicationSettings), _appSettings);
            Configuration.Bind(nameof(MockSetting), _mockSetting);
            services.AddSingleton<IBookService, BookService>();
            services.AddTransient<IProductService, ProductService>();

            services.AddSingleton(_appSettings);
            services.AddSingleton(_mockSetting);

						//依赖注入config的方法二：读取某个section的配置
						services.Configure<ApplicationSettings>(Configuration.GetSection(nameof(ApplicationSettings)));
						services.Configure<MockSetting>(Configuration.GetSection(nameof(MockSetting)));

						//services.Configure<OtherConfigs>(Configuration.GetSection(nameof(OtherConfigs)));
						//依赖注入config的方法三：仅仅适用于简单的配置 - 一个属性值; 
						services.Configure<OtherConfigs>(Configuration);
						services.Configure<DBConnectionConfig>(Configuration);
           
						#region
						//Options can have their values updated during runtime.
						//https://stackoverflow.com/questions/77668688/when-to-use-configure-to-set-up-dependency-injection

						//Add IOptionsSnapshot<> service with lifetime Scoped.
						//Add IOptionsMonitor<> service with lifetime Singleton.
						//Add IOptionsFactory<> service with lifetime transient.
						//Add IOptionsMonitorCache<> with Singleton lifetime.
						//Add IOptions<> with Singleton Lifetime to DI Container.						
            //if you want to read configuration changes take a look at IOptionsMonitor, IOptionsSnapshot
						#endregion
						services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
