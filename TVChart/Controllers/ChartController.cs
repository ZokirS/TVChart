using Microsoft.AspNetCore.Mvc;
using TVChart.Models;

namespace TVChart.Controllers;

[Route("api/chart")]
[ApiController]
public class ChartController : ControllerBase
{
    private readonly ILogger<ChartController> _logger;
    public ChartController(ILogger<ChartController> logger)
    {
        _logger = logger;
    }
    [HttpGet]
    public IEnumerable<Candle> Get()
    {
        List<Candle> candles = new List<Candle>();
        candles.AddRange(
            new Candle[] {
                new Candle
                {
                    Time = DateTime.Now,
                    Open = 75.16m,
                    High = 82.84m,
                    Low= 36.16m,
                    Close = 45.72m
                },
                new Candle
                {
                    Time = DateTime.Now.AddDays(-1),
                    Open = 75.16m,
                    High = 45.12m,
                    Low= 45.12m,
                    Close = 48.72m
                },
                new Candle
                {
                    Time = DateTime.Now.AddDays(-2),
                    Open = 60.71m,
                    High = 60.71m,
                    Low= 53.39m,
                    Close = 59.29m
                }});
        return candles.OrderBy(x=>x.Time);
    }
}

