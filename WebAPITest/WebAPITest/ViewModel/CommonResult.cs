namespace WebAPITest.ViewModel
{
    /// <summary>
    /// a standard return
    /// </summary>
    public class CommonResult
    {
        public bool IsSucess { get; set; }

        public string? Message { get; set; }

        public object? Result { get; set; }// all objects based on this object
    }

    //public class CommonResult<T> where T:class
    //{
    //    public bool IsSucess { get; set; }

    //    public string? Message { get; set; }

    //    //把object 替换泛型T
    //    public T? Result { get; set; }
    //}

    public class CommonResult<T> 
    {
        public bool IsSucess { get; set; }

        public string? Message { get; set; }

        //把object 替换泛型T
        public T? Result { get; set; }
    }
}
