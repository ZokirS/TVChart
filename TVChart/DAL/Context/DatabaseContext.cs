using Microsoft.EntityFrameworkCore;
using TVChart.DAL.Models;

namespace TVChart.DAL.Context
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Candle> Candle { get; set; }
    }
}
