using Library.API.Controllers;
using Library.API.Data.Models;
using Library.API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace libraryAPI.Test
{
    public class BooksControllerTest
    {
        BooksController _controller;
        IBookService _service;

        public BooksControllerTest()
        {
            //easy and straightforward way to create the dependency servcie instance
            _service = new BookService();
            _controller = new BooksController(_service);
        }

        [Fact]
        public void GetAllTest_Should_Return_AllBooks()
        {
            //Arrange
            //Act
            var result = _controller.Get();
            //Assert
            Assert.IsType<OkObjectResult>(result.Result);

            var list = result.Result as OkObjectResult;

            Assert.IsType<List<Book>>(list.Value);

            var listBooks = list.Value as List<Book>;

            Assert.Equal(5, listBooks.Count);
            Assert.True(listBooks.Count == 5);            
        }

        [Theory]//移除掉TheoryAttribute 该TestCase就消失了
        [InlineData("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200", "ab2bd817-98cd-4cf3-a80a-53ea0cd9c111", "Managing Oneself")]
        [InlineData("cd5089dd-9754-4ed2-b44c-488f533243ef", "cf4089dd-9754-4ed2-b44c-488f5332121f", "The Selfish Gene")]
				[InlineData("cdd089dd-9754-4ed2-b412-488f533243ef", "cf4089dd-9754-4ed2-b44b-488f5332121f", "The Selfish Gene 1")]
				public void GetBookByIdTest_Should_Return_Specific_Book(string guid1,string guid2, string expectedTitle)
        {
            //Arrange            
            var validGuid = new Guid(guid1);
            var invalidGuid = new Guid(guid2);

            //Act
            var notFoundResult = _controller.Get(invalidGuid);
            var okResult = _controller.Get(validGuid);

            //Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
            Assert.IsType<OkObjectResult>(okResult.Result);

            //Now we need to check the value of the result for the ok object result.
            var item = okResult.Result as OkObjectResult;

            //We Expect to return a single book
            Assert.IsType<Book>(item.Value);

            //Now, let us check the value itself.
            var bookItem = item.Value as Book;
            Assert.Equal(validGuid, bookItem.Id);
            Assert.Equal(expectedTitle, bookItem.Title);
        }

        [Fact]
        public void AddBookTest_Should_Add_NewBook()
        {
            //Arrange
            var completeBook = new Book()
            {
                Author = "Author",
                Title = "Title",
                Description = "Description"
            };

            //Act
            var createdResponse = _controller.Post(completeBook);

            //Assert
            Assert.IsType<CreatedAtActionResult>(createdResponse);

            //value of the result
            var item = createdResponse as CreatedAtActionResult;
            
            Assert.IsType<Book>(item.Value);

            //check value of this book
            var bookItem = item.Value as Book;
            Assert.Equal(completeBook.Author, bookItem.Author);
            Assert.Equal(completeBook.Title, bookItem.Title);
            Assert.Equal(completeBook.Description, bookItem.Description);


            //Arrange
            var incompleteBook = new Book()
            {
                Author = "Author",
                Description = "Description"
            };

            //Act
            _controller.ModelState.AddModelError("Title", "Title is a requried filed");
            var badResponse = _controller.Post(incompleteBook);

            //Assert
            Assert.IsType<BadRequestObjectResult>(badResponse);
        }

        [Theory]
        [InlineData("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200", "ab2bd817-98cd-4cf3-a80a-53ea0cd9c111")]
        public void RemoveBookByIdTest_Should_Remove_Specific_Book(string guid1, string guid2)
        {
            //Arrange
            var validGuid = new Guid(guid1);
            var invalidGuid = new Guid(guid2);

            //Act
            var notFoundResult = _controller.Remove(invalidGuid);

            //Assert
            Assert.IsType<NotFoundResult>(notFoundResult);
            Assert.Equal(5, _service.GetAll().Count());

            //Act
            var okResult = _controller.Remove(validGuid);

            //Assert
            Assert.IsType<OkResult>(okResult);
            Assert.Equal(4, _service.GetAll().Count());            
        }

    }
}
