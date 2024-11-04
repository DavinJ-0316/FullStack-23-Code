using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

public class NLogController : Controller
{
    private readonly ILogger<NLogController> _logger;

    public NLogController(ILogger<NLogController> logger)
    {
        _logger = logger;
        _logger.LogDebug(1, "NLog injected into NLogController");
    }

    public IActionResult Index()
    {
        _logger.LogInformation("Hello, this is the index!");
        return View();
    }
}