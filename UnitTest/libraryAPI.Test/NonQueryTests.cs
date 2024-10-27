using Library.API.Data;
using Library.API.Services;
using Moq;
using System.Data.Entity;
using Xunit;

namespace libraryAPI.Test
{
		public class NonQueryTests
    {
        [Fact]
        public void CreateBlog_saves_a_blog_via_context()
        {
            //Arrange
            var mockSet = new Mock<DbSet<Blog>>();
            var mockBlob = new Mock<Blog>();

            var mockContext = new Mock<BloggingContext>();
            mockContext.Setup(m => m.Blogs).Returns(mockSet.Object);
            
            //mockSet.Setup(x => x.Add(It.IsAny<Blog>())).Returns(mockBlob.Object);

            //Act
            var service = new BlogService(mockContext.Object);
            var result = service.AddBlog("ADO.NET Blog", "http://blogs.msdn.com/adonet");

            //Assert
            mockSet.Verify(m => m.Add(It.IsAny<Blog>()), Times.Once());
            mockContext.Verify(m => m.SaveChanges(), Times.Once());
        }
    }
}
