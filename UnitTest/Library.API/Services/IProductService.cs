using Library.API.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Library.API.Services
{
    public interface IProductService
    {
        string EditTime { get; set; }
        IEnumerable<Product> GetProducts(IList<Product> products, string name);
        IList<Product> GetAllProducts();
        Task<IList<FakeProduct>> GetRemoteProductsAsync();
        string GetConfig();
    }
}
