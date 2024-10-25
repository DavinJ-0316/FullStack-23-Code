namespace Connor_NET4Assignment.Models;

public class ConsistentResult<T>
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public T? Data { get; set; }
    public List<string>? Errors { get; set; }
    public ConsistentResult()
    {
        Success = true;
        Message = "Operation successful!";
        Data = default;
        Errors = null;
    }
    public ConsistentResult(T data)
    {
        Success = true;
        Message = "Operation successful!";
        Data = data;
        Errors = null;
    }
    public ConsistentResult(List<string> errors)
    {
        Success = false;
        Message = "Operation failed!";
        Data = default;
        Errors = errors;
    }
}