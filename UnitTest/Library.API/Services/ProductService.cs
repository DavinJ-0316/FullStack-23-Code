using Library.API.Config;
using Library.API.Data.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Library.API.Services
{
		public class ProductService : IProductService
    {
        private ApplicationSettings _settings;
        private OtherConfigs _otherConfigs;
        private IOptions<ApplicationSettings> _applicationSettings;

        private readonly IConfiguration Configuration;
        private readonly OtherConfigs config_otherconfigs = new OtherConfigs();
        private readonly DBConnectionConfig _dBConnectionConfig;
        private readonly MockSetting _mockConfig;
        private readonly MockSetting _fromSingleTonMockConfig;

        public string EditTime {  get; set; }

        //Mock protected method need below constructor and virtual method
        public ProductService() { }

        protected virtual string ProtectedMethod()
        {
            return "This is the output from ProtectedMethod";
        }

        public string CallProtectedMethod()
        {
            return ProtectedMethod();
        }

        public string GetConfig()
        {
            return _otherConfigs.Prefix;
        }

				//关于配置 - 可以传入整个的IConfiguration对象
				//   但是它是整个配置信息 大部分情况下 对某一个service 整个配置信息太大 有很多是用不上的
				//   所以微软推荐我们使用Options Pattern - 
				//      https"://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options?view=aspnetcore-8.0
        //   具体的service/class只依赖于自己感兴趣或者用到的配置
				public ProductService(
            ApplicationSettings appSettings,
            MockSetting singleTonMockSetting,
            IConfiguration configuration,
            IOptions<ApplicationSettings> applicationSettings,
            IOptionsSnapshot<OtherConfigs> otherconfigs,
						IOptionsSnapshot<DBConnectionConfig> dbConnectionConfig,
            IOptions<MockSetting> mockConfig)
        {
            Configuration = configuration;            
            _settings = appSettings;
            _applicationSettings = applicationSettings;
            _otherConfigs = otherconfigs.Value;
            _dBConnectionConfig = dbConnectionConfig.Value;
            _mockConfig = mockConfig.Value;
            _fromSingleTonMockConfig = singleTonMockSetting;

						//Vefiry ProductService lifetime - Transient
						Console.WriteLine($"Construct the service at {DateTime.Now}");

            //关于配置的动态读取 - 在服务运行时 配置改变能否动态更新
            //1. 以下方式会每次从配置文件 都读取other config 所以也是最新的
						Configuration.GetSection(nameof(OtherConfigs)).Bind(config_otherconfigs);
						Console.WriteLine($"{config_otherconfigs.Prefix}");

            //2. 下面使用的是依赖注入的方式 由于使用的是IOptionSnapshot的接口 所以也是能在运行时获取到更新的配置值
            Console.WriteLine($"{_otherConfigs.Prefix}");
            //3. 试着把IOptionSnapshot 替换成IOptions 看到同样的配置 在运行时 如果配置文件修改了 这里是不会更改的

        }

        public IEnumerable<Product> GetProducts(IList<Product> products, string name)
        {
            //In real project, it could send request to the remote and pull the products from remote.
            //And it is hard to call the real remote API for unit testing
            Console.WriteLine($"config_otherconfigs prefix: {config_otherconfigs.Prefix}");
            return products.Where(x => x.Name.Contains(name));
        }

        public IList<Product> GetAllProducts()
        {
            var testProducts = new List<Product>();
            testProducts.Add(new Product { Id = 1, Name = "Demo1", Price = 1 });
            testProducts.Add(new Product { Id = 2, Name = "Demo2", Price = 3.75M });
            testProducts.Add(new Product { Id = 3, Name = "Demo3", Price = 16.99M });
            testProducts.Add(new Product { Id = 4, Name = "Demo4", Price = 11.00M });

            return testProducts;
        }

        public async Task<IList<FakeProduct>> GetRemoteProductsAsync()
        {
            HttpClient client = new HttpClient();
            //Imaging there is some access token required to pull data remotely
            using HttpResponseMessage response = await client.GetAsync(_settings.URL);

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            return JsonSerializer.Deserialize<IList<FakeProduct>>(jsonResponse, options);
        }
    }
}
