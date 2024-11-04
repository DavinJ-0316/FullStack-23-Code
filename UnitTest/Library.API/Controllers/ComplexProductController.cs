using Library.API.Data.Models;
using Library.API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplexProductController : ControllerBase
    {
        private IList<Product> products;
        private readonly IProductService _service;

        public ComplexProductController(IProductService service)
        {
            _service = service;
            products = _service.GetAllProducts();
        }

        [HttpGet("configs")]
        public ActionResult GetConfigs()
        {
            return Ok(_service.GetConfig());
        }

        [HttpGet("Products/{name}")]
        public ActionResult<IEnumerable<Product>> GetSpecificProductsWithDoublePrice(string name)
        {
            var result = _service.GetProducts(products, name);

            ManipulateProducts(result);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("HighRateProducts/")]
        public async Task<ActionResult<IEnumerable<FakeProduct>>> GetHighRateProducts()
        {
            var products = await GetProductsAsync();
            products = products.Where(x => x.Rating.Rate > 4).ToList();
            return Ok(products);
        }

        public ActionResult GetProductWithName(string name)
        {
            if (name == "NotExisting") throw new KeyNotFoundException();
            else return Ok();
        }

        private async Task<IEnumerable<FakeProduct>> GetProductsAsync()
        {
            return await _service.GetRemoteProductsAsync();
        }
        private void ManipulateProducts(IEnumerable<Product> products)
        {
            foreach (var product in products) 
            {
                product.Price *= 2;
            }
        }

    }
}
