using Library.API.Controllers;
using Library.API.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace libraryAPI.Test
{
    public class ProductControllerTest
    {
        [Fact]
        public void GetAllProducts_ShouldReturnAllProducts()
        {
						//Arrange						
						var controller = new SimpleProductController();
						//Act
						var result = controller.GetAllProducts() as List<Product>;
						//Assert
						Assert.NotNull(result);
            Assert.NotEmpty(result);
            Assert.True(result.Count > 0);
        }

        [Fact]
        public async Task GetAllProductsAsync_ShouldReturnAllProducts()
        {
            var controller = new SimpleProductController();

						//outside caller --> GetAllProductsAsync_ShouldReturnAllProducts

						var result = await controller.GetAllProductsAsync() as List<Product>;
            Assert.NotNull(result);
            Assert.NotEmpty(result);
            Assert.True(result.Count > 0);
        }

        [Fact]
        public void GetProduct_ShouldReturnCorrectProduct()
        {
            var controller = new SimpleProductController();

            var result = controller.GetProduct(4);
            Assert.IsType<OkObjectResult>(result);

            Assert.NotNull(result);
            Assert.IsType<Product>((result as OkObjectResult).Value);
            Assert.Equal("Demo4", (((result as OkObjectResult).Value) as Product).Name);
        }

        [Fact]
        public async Task GetProductAsync_ShouldReturnCorrectProduct()
        {
            var controller = new SimpleProductController();            
            var result = await controller.GetProductAsync(3);

            Assert.IsType<OkObjectResult>(result);

            Assert.NotNull(result);
            Assert.IsType<Product>((result as OkObjectResult).Value);

            Assert.Equal("Demo3", (((result as OkObjectResult).Value) as Product).Name);
        }

        [Fact]
        public void GetProduct_ShouldNotFindProduct()
        {
            var controller = new SimpleProductController();

            var result = controller.GetProduct(999);
            Assert.IsType<NotFoundResult>(result);            
        }

				[Theory]
				[InlineData(null)]				
				public void TestIfValueIsNullorwhiteSpace(int? productId)
				{
						//Act
						var controller = new SimpleProductController();
						Action act = () => controller.GetProduct(productId);

						// Assert
            ArgumentNullException argumentNullException = Assert.Throws<ArgumentNullException>(act);
            Assert.Equal("Product Id can't be null (Parameter 'id')", argumentNullException.Message);
				}
		}
}
