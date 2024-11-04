using Microsoft.AspNetCore.Server.Kestrel.Core.Features;
using System.Text.Json.Serialization;

namespace Library.API.Data.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }

    public class FakeProduct
    {        
        public int Id { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string Catgeory { get; set; }
        public string Image { get; set; }        
        public ProductRate Rating { get; set; }
    }

    public class ProductRate
    {
        public double Rate { get; set; }
        public int Count { get; set; }
    }
}
