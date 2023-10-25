using Microsoft.AspNetCore.Mvc;

namespace TVChart.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }   

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            List<WeatherForecast> arr = new List<WeatherForecast>();
            arr.AddRange(new List<WeatherForecast> {
                new WeatherForecast
                {
                    Date = DateTime.Now,
                    Summary = "Sunny",
                    TemperatureC = 10
                },
                new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(-2),
                    Summary = "Cloudy",
                    TemperatureC = 105
                }});
            return arr;
        }
    }
}