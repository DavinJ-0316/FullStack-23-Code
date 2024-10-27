using Library.API.Controllers;
using Library.API.Data.Models;
using Library.API.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Moq.Protected;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace libraryAPI.Test
{
    public class ProductControllerMockServiceTest
    {
        private readonly IProductService mockProductService;
        private IList<Product> mockProducts
        {
            get
            {
                return new List<Product>
                {
                    new Product { Id = 1, Name = "MockDemo1", Price = 1 },
                    new Product { Id = 2, Name = "MockDemo2", Price = 3.75M },
                    new Product { Id = 3, Name = "MockDemo3", Price = 16.99M },
                    new Product { Id = 4, Name = "MockDemo4", Price = 11.00M }
                };
            }
        }

        public ProductControllerMockServiceTest()
        {
            //made stubbed properties fully lazy.
            //(Mock.Of<T> traditionally calls SetupAllProperties, which stubs all properties.) 
            //new Mock<IProductService>();
            mockProductService = Mock.Of<IProductService>();
            mockProductService.EditTime = $"{DateTime.Now}";

						//Mock Property
						//注意如果没有下面的setup 后面一行给属性赋值是没有作用的
						//but you're not mocking the class you're mocking the interface - and that interface knows nothing of your class implementatio
						var mockerProductService = new Mock<IProductService>();
            //mockerProductService.SetupProperty(x => x.EditTime);
            mockerProductService.Object.EditTime = $"{DateTime.Now}";

						Mock.Get(mockProductService).Setup(x => x.GetAllProducts()).Returns(mockProducts);
            Mock.Get(mockProductService)
                .Setup(x => x.GetProducts(It.IsAny<IList<Product>>(), It.IsAny<string>()))
                .Returns(mockProducts.Where(x=>x.Name.Contains("Demo")));
        }

        /// <summary>
        /// 使用mock 来模拟ProductService的操作 该测试案例主要来测试 ManipulateProducts方法的返回结果
        /// </summary>
        [Fact]
        public void GetAllProducts_ShouldReturnAllProducts()
        {
            var controller = new ComplexProductController(mockProductService);
            var result = controller.GetSpecificProductsWithDoublePrice("Demo1");
            
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result.Result);

            var resultValue = result.Result as OkObjectResult;
            var resultProducts = resultValue.Value as IEnumerable<Product>;

            Assert.IsType<List<Product>>(resultProducts.ToList());

            resultProducts.ToList().ForEach(
                x => 
                {
                    var mockProduct = mockProducts.First(y => y.Name == x.Name);
                    Assert.True(x.Price == mockProduct.Price * 2);
                });
                       
        }

        /// <summary>
        /// 使用mock来模拟访问远程的服务 该测试案例主要用来演示 unit test中如何模拟第三方API返回数据
        /// 在真实的项目中unit test是不需要真正访问 远程API的 这主要涉及到 安全和cost
        /// 使用mock技术 可以假设已经从远程 获取到了数据；主要测试后续对数据的处理
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task GetHighRateProducts_ShouldRetrun_Rate_GreaterThan4_Products()
        {
            //Arrange
            IList<FakeProduct> mockProducts = new List<FakeProduct>();

            using (StreamReader reader = new StreamReader(@"MockProducts/products.json"))
            {
                var productsStringValue = reader.ReadToEnd();
                mockProducts = System.Text.Json.JsonSerializer.Deserialize<IList<FakeProduct>>(productsStringValue, new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true});
            }

            var controller = new ComplexProductController(mockProductService);
            Mock.Get(mockProductService).Setup(x => x.GetRemoteProductsAsync()).Returns(Task.FromResult(mockProducts));

            //Act
            var highRateProducts = await controller.GetHighRateProducts();

            //Assert
            Assert.IsType<OkObjectResult>(highRateProducts.Result);
            Assert.NotNull(highRateProducts.Result as OkObjectResult);
            var result = highRateProducts.Result as OkObjectResult;

            Assert.True((result.Value as IList<FakeProduct>).Count == 7);
        }

        /// <summary>
        /// Mock protected method two notest:
        /// 1. the protected method need bo be virtual
        /// 2. need the constructor without param
        /// </summary>
        [Fact]
        public void TestMockProtectedMethod()
        {
            var mockProductService1 = new Mock<ProductService>();

            mockProductService1.Protected().Setup<string>("ProtectedMethod").Returns("mockstring");
            var result = mockProductService1.Object.CallProtectedMethod();
            Assert.Equal("mockstring", result);
        }

        [Fact]
        public void Test_Throw_Exception()
        {
						var controller = new ComplexProductController(mockProductService);            

            Assert.Throws(typeof(KeyNotFoundException), 
                () => { controller.GetProductWithName("NotExisting"); });
				}
    }
}
