using Microsoft.EntityFrameworkCore;
using TVChart.DAL.Context;
using TVChart.Services;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
var defaultConnectionString = config.GetConnectionString("DefaultConnection");
// Add services to the container.

builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllersWithViews();
builder.Services.AddScoped<ICandleService, CandleService>();
builder.Services.AddDbContext<DatabaseContext>(opts =>
{
    opts.UseSqlServer(defaultConnectionString);
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.
        WithOrigins("https://localhost:44462")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});
var app = builder.Build();
using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetService<DatabaseContext>();

context.Database.EnsureCreated();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("CorsPolicy");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
