namespace TVChart.DTOs
{
    public record CandleDto
    {
        public DateTime OpenTime { get; set; }
        public decimal Open { get; set; }
        public decimal Close { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public decimal Rsi { get; set; }

    }
}
