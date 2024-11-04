using Library.API.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Controllers
{
    /// <summary>
    /// 该示例使用了hard-coded的products, 模拟了最简单的一种情况
    /// unit test 测试API Controller的 接口方法
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class SimpleProductController : ControllerBase
    {
        List<Product> products = new List<Product>();        

        public SimpleProductController()
        {
            this.products = GetTestProducts();
        }

        [HttpGet("GetAllProducts")]
        public IEnumerable<Product> GetAllProducts()
        {
            return products;
        }

        [HttpGet("GetAllProductsAsync")]
        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await Task.FromResult(GetAllProducts());
        }

        [HttpGet("{id}")]
        public ActionResult GetProduct(int id)
        {
            var product = products.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpGet("async/{id}")]        
        public async Task<ActionResult> GetProductAsync(int id)
        {
            return await Task.FromResult(GetProduct(id));
        }

				[HttpGet("optional/{id}")]
				public ActionResult GetProduct(int? id)
				{
            if (id == null) throw new ArgumentNullException("id", "Product Id can't be null");
						return Ok(GetProduct(id.Value));
				}

				private List<Product> GetTestProducts()
        {
            var testProducts = new List<Product>();
            testProducts.Add(new Product { Id = 1, Name = "Demo1", Price = 1 });
            testProducts.Add(new Product { Id = 2, Name = "Demo2", Price = 3.75M });
            testProducts.Add(new Product { Id = 3, Name = "Demo3", Price = 16.99M });
            testProducts.Add(new Product { Id = 4, Name = "Demo4", Price = 11.00M });

            return testProducts;
        }
    }
}
