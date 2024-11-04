using Library.API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace libraryAPI.Test.ServiceTest
{
		public class BookServiceTest
		{
				IBookService _bookService;

				public BookServiceTest()
				{
						_bookService = new BookService();
				}

				[Fact]
				public void GetAllBooks_Should_Return_AllBooks()
				{
						//Action
						var result = _bookService.GetAll();
						//Assert
						Assert.True(result.Count() > 0);
				}
		}
}
