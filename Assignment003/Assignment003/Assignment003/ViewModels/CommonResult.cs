namespace Assignment003.ViewModels
{
    public class CommonResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
    }
    public class CommonResult<T> : CommonResult
    {
        public T Result { get; set; }
    }
}
