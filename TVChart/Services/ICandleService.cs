using TVChart.DTOs;

namespace TVChart.Services
{
    public interface ICandleService
    {
        IEnumerable<CandleDto> GetAllCandles();
    }
}
