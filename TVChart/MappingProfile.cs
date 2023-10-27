using AutoMapper;
using TVChart.DAL.Models;
using TVChart.DTOs;

namespace TVChart
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Candle, CandleDto>();
        }
    }
}
