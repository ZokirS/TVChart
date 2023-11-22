using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TVChart.DAL.Models;

namespace TVChart.DAL.Configuration
{
    public class CandleConfiguration: IEntityTypeConfiguration<ModifiedCandle>
    {

        public void Configure(EntityTypeBuilder<ModifiedCandle> builder)
        {
            builder.HasData(
                new ModifiedCandle
                {
                    Id = 1,
                    OpenTime = new DateTime(2023, 10 ,15, 00,00,00),
                    Open = 26852.48m,
                    Close = 27154.15m,
                    High = 27293.33m,
                    Low = 26808.25m,
                    Rsi = 51.04m,
                    Operation = 0
                },
                new ModifiedCandle
                {
                    Id = 2,
                    OpenTime = new DateTime(2023 , 10 , 14, 00,00,00),
                    Open = 26862.00m,
                    Close = 26852.48m,
                    High = 26989.58m,
                    Low = 26789.00m,
                    Rsi = 46.43m,
                    Operation = 1
                },
                new ModifiedCandle
                {
                    Id = 3,
                    OpenTime = new DateTime(2023 , 10 , 13, 00,00,00),
                    Open = 26759.63m,
                    Close = 26862.00m,
                    High = 27130.00m,
                    Low = 26685.00m,
                    Rsi = 46.56m,
                    Operation = 0
                },
                new ModifiedCandle
                {
                    Id = 4,
                    OpenTime = new DateTime(2023 , 10 , 12, 00,00,00),
                    Open = 26875.52m,
                    Close = 26759.63m,
                    High = 26947.04m,
                    Low = 26555.00m,
                    Rsi = 45.04m,
                    Operation = 1
                },
                new ModifiedCandle
                {
                    Id = 5,
                    OpenTime = new DateTime(2023 , 10 , 11, 00,00,00),
                    Open = 27390.12m,
                    Close = 26875.52m,
                    High = 27477.39m,
                    Low = 26538.66m,
                    Rsi = 46.43m,
                    Operation = 2
                },
                new ModifiedCandle
                {
                    Id = 6,
                    OpenTime = new DateTime(2023 , 10 , 10, 00,00,00),
                    Open = 27590.12m,
                    Close = 27390.12m,
                    High = 27735.00m,
                    Low = 27298.00m,
                    Rsi = 53.18m,
                    Operation = 0
                },
                new ModifiedCandle
                {
                    Id = 7,
                    OpenTime = new DateTime(2023 , 10 , 09, 00,00,00),
                    Open = 27917.06m,
                    Close = 27590.12m,
                    High = 27987.93m,
                    Low = 27260.00m,
                    Rsi = 56.12m,
                    Operation = 1
                },
                new ModifiedCandle
                {
                    Id = 8,
                    OpenTime = new DateTime(2023 , 10 , 08, 00,00,00),
                    Open = 27956.67m,
                    Close = 27917.05m,
                    High = 28095.14m,
                    Low = 27687.50m,
                    Rsi = 61.26m,
                    Operation = 0
                },
                new ModifiedCandle
                {
                    Id = 9,
                    OpenTime = new DateTime(2023 , 10 , 07, 00,00,00),
                    Open = 27931.10m,
                    Close = 27956.67m,
                    High = 28029.67m,
                    Low = 27842.08m,
                    Rsi = 61.90m,
                    Operation = 0
                },
                new ModifiedCandle
                {
                    Id = 10,    
                    OpenTime = new DateTime(2023,10,06, 00,00,00),
                    Open = 27410.39m,
                    Close = 27931.09m,
                    High = 28295.00m,
                    Low = 27175.94m,
                    Rsi = 61.66m,
                    Operation = 2
                });
        }
    }
}
