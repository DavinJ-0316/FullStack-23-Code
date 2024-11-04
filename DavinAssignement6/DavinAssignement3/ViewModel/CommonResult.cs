namespace DavinAssignement3.ViewModel
{
    public class CommonResult<T>
    {
        public bool IsSuccess { get; set; }

        public string? Message { get; set; }

        public T? Data { get; set; }

        public object? Error { get; set; }

        public object? TimeStamp { get; set; }
    }
}
