using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TVChart.DAL.Context;
using TVChart.DTOs;

namespace TVChart.Services
{
    public class CandleService : ICandleService
    {
        private IMapper _mapper;
        private DatabaseContext _context;
        public CandleService(IMapper mapper, DatabaseContext context)
        {
            _mapper = mapper;
            _context = context;

        }
        public  IEnumerable<CandleDto> GetAllCandles(int timeframeId)
        {
            var candles =  _context.Candle.Where(x=>x.ExchangeTimeframeId == timeframeId).ToArray();
            var candlesDto =  _mapper.Map<IEnumerable<CandleDto>>(candles);
            return candlesDto.OrderBy(x => x.OpenTime);
        }
    }
}
