using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TVChart.DAL.Context;
using TVChart.DAL.Models;
using TVChart.DTOs;

namespace TVChart.Services
{
    public class CandleService : ICandleService
    {
        private DatabaseContext _context;
        public CandleService( DatabaseContext context)
        {
            _context = context;

        }
        public  IEnumerable<ModifiedCandle> GetAllCandles()
        {
            var candles =  _context.Candles.ToArray();
            return candles.OrderBy(x => x.OpenTime);
        }
    }
}
