using LazyCache;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SensGrid.src.Entities;
using SensGrid.src.Services;

[assembly: FunctionsStartup(typeof(SensGrid.Startup))]

namespace SensGrid
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var configuration = builder.GetContext().Configuration;

            builder.Services.AddDbContext<SensgridContext>(options =>
            {
                var connectionString = configuration["EmployeeDbConnectionString"]
                    ?? configuration["SqlConnectionString"]
                    ?? configuration.GetConnectionString("EmployeeDbConnectionString")
                    ?? configuration.GetConnectionString("SqlConnectionString")
                    ?? throw new InvalidOperationException("No SQL connection string found. Set EmployeeDbConnectionString or SqlConnectionString in local.settings.json.");

                options.UseSqlServer(connectionString);
            });

            builder.Services.AddMemoryCache();
            builder.Services.AddLazyCache();
            builder.Services.AddScoped<EmployeesService>();
            builder.Services.AddScoped<UsersService>();
        }
    }
}
