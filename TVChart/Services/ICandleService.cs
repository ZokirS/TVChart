using TVChart.DAL.Models;
using TVChart.DTOs;

namespace TVChart.Services
{
    public interface ICandleService
    {
        IEnumerable<ModifiedCandle> GetAllCandles();
    }
}
