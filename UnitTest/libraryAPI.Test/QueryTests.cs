using Library.API.Data;
using Library.API.Services;
using Moq;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Xunit;

namespace libraryAPI.Test
{
		public class QueryTests
    {
        [Fact]
        public void GetAllBlogs_orders_by_name()
        {
            var data = new List<Blog>
            {
                new Blog { Name = "BBB" },
                new Blog { Name = "ZZZ" },
                new Blog { Name = "AAA" },
            }.AsQueryable();  

            var mockSet = new Mock<DbSet<Blog>>();
            mockSet.As<IQueryable<Blog>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Blog>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Blog>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Blog>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());

            var mockContext = new Mock<BloggingContext>();//Mock instance of BloggingContext
            mockContext.Setup(c => c.Blogs).Returns(mockSet.Object);            
            
            var service = new BlogService(mockContext.Object);						
						var blogs = service.GetBlosNameMoreThan3();

            Assert.Equal(3, blogs.Count);
            Assert.Equal("AAA", blogs[0].Name);
            Assert.Equal("BBB", blogs[1].Name);
            Assert.Equal("ZZZ", blogs[2].Name);
        }
    }
}
