using LazyCache;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SensGrid.src.Entities;

namespace SensGrid.src.Services
{
    public class EmployeesService
    {
        private readonly SensgridContext dbcontext;
        private readonly IAppCache cache;
        private readonly ILogger<EmployeesService> log;

        public EmployeesService(SensgridContext dbContext, IAppCache cache, ILogger<EmployeesService> log)
        {
            this.dbcontext = dbContext;
            this.cache = cache;
            this.log = log;
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            var cacheKey = "employees_all";
            return await cache.GetOrAddAsync(cacheKey, async () =>
            {
                var result = await dbcontext.Employees
                    .AsNoTracking()
                    .OrderBy(x => x.Id)
                    .ToListAsync();

                log.LogInformation("Loaded {Count} employees from database.", result.Count);
                return result;
            }, TimeSpan.FromMinutes(5));
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            return await dbcontext.Employees
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Employee> CreateEmployee(Employee employee)
        {
            employee.CreatedAt = DateTime.UtcNow;
            dbcontext.Employees.Add(employee);
            await dbcontext.SaveChangesAsync();
            cache.Remove("employees_all");
            return employee;
        }

        public async Task<Employee> UpdateEmployee(int id, Employee employee)
        {
            var existing = await dbcontext.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (existing == null)
                return null;

            existing.Firstname = employee.Firstname;
            existing.Lastname = employee.Lastname;
            existing.Email = employee.Email;
            existing.Phone = employee.Phone;
            existing.Role = employee.Role;

            await dbcontext.SaveChangesAsync();
            cache.Remove("employees_all");
            return existing;
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            var existing = await dbcontext.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (existing == null)
                return false;

            dbcontext.Employees.Remove(existing);
            await dbcontext.SaveChangesAsync();
            cache.Remove("employees_all");
            return true;
        }
    }
}
