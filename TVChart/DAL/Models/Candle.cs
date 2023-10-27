namespace TVChart.DAL.Models;

public class Candle
{
    public long Id { get; set; }
    public long ExchangeTimeframeId { get; set; }
    public DateTime OpenTime { get; set; }
    public decimal Open { get; set; }
    public decimal Close { get; set; }
    public decimal High { get; set; }
    public decimal Low { get; set; }
    public decimal Volume { get; set; }
    public decimal Up { get; set; }
    public decimal Down { get; set; }
    public decimal UpAverage { get; set; }
    public decimal DownAverage { get; set; }
    public decimal Rsi { get; set; }
}

