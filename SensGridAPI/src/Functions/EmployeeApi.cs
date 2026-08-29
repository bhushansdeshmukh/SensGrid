using LazyCache;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SensGrid.src.Entities;
using SensGrid.src.Models;
using SensGrid.src.Services;
using System;
using System.IO;
using System.Threading.Tasks;

namespace SensGrid.src.Functions
{
    public class EmployeeApi
    {
        private readonly EmployeesService employeesService;
        private readonly ILogger<EmployeeApi> log;

        public EmployeeApi(EmployeesService employeesService, ILogger<EmployeeApi> log)
        {
            this.employeesService = employeesService;
            this.log = log;
        }

        [FunctionName("GetEmployees")]
        public async Task<IActionResult> GetEmployees(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "employees")] HttpRequest req,
            ILogger log)
        {
            var result = await employeesService.GetAllEmployees();
            return new OkObjectResult(result);
        }

        [FunctionName("GetEmployeeById")]
        public async Task<IActionResult> GetEmployeeById(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "employees/{id:int}")] HttpRequest req,
            int id,
            ILogger log)
        {
            var result = await employeesService.GetEmployeeById(id);
            if (result == null)
                return new NotFoundResult();

            return new OkObjectResult(result);
        }

        [FunctionName("CreateEmployee")]
        public async Task<IActionResult> CreateEmployee(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "employees")] HttpRequest req,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<EmployeeRequest>(requestBody);

            if (data == null)
                return new BadRequestObjectResult("Invalid request body.");

            if (string.IsNullOrWhiteSpace(data.Firstname) ||
                string.IsNullOrWhiteSpace(data.Lastname) ||
                string.IsNullOrWhiteSpace(data.Email) ||
                string.IsNullOrWhiteSpace(data.Phone) ||
                string.IsNullOrWhiteSpace(data.Role))
            {
                return new BadRequestObjectResult("All employee fields are required.");
            }

            var entity = new Employee
            {
                Firstname = data.Firstname.Trim(),
                Lastname = data.Lastname.Trim(),
                Email = data.Email.Trim(),
                Phone = data.Phone.Trim(),
                Role = data.Role.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            if (data.Id.HasValue && data.Id.Value > 0)
            {
                var updated = await employeesService.UpdateEmployee(data.Id.Value, entity);
                if (updated == null)
                    return new NotFoundResult();

                return new OkObjectResult(updated);
            }

            var created = await employeesService.CreateEmployee(entity);
            return new OkObjectResult(created);
        }

        [FunctionName("UpdateEmployee")]
        public async Task<IActionResult> UpdateEmployee(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "employees/{id:int}")] HttpRequest req,
            int id,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<EmployeeRequest>(requestBody);

            if (data == null)
                return new BadRequestObjectResult("Invalid request body.");

            var entity = new Employee
            {
                Firstname = data.Firstname ?? string.Empty,
                Lastname = data.Lastname ?? string.Empty,
                Email = data.Email ?? string.Empty,
                Phone = data.Phone ?? string.Empty,
                Role = data.Role ?? string.Empty
            };

            var updated = await employeesService.UpdateEmployee(id, entity);
            if (updated == null)
                return new NotFoundResult();

            return new OkObjectResult(updated);
        }

        [FunctionName("DeleteEmployee")]
        public async Task<IActionResult> DeleteEmployee(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "employees/{id:int}")] HttpRequest req,
            int id,
            ILogger log)
        {
            var deleted = await employeesService.DeleteEmployee(id);
            if (!deleted)
                return new NotFoundResult();

            return new OkResult();
        }
    }
}
