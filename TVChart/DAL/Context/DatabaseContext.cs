using Microsoft.EntityFrameworkCore;
using TVChart.DAL.Configuration;
using TVChart.DAL.Models;

namespace TVChart.DAL.Context
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {}

        //public DbSet<Candle> Candle { get; set; }
        public DbSet<ModifiedCandle> Candles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
           
            modelBuilder.ApplyConfiguration(new CandleConfiguration());
        }

    }
}
