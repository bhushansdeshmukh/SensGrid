using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SensGrid.src.Models;
using SensGrid.src.Services;
using System.IO;
using System.Threading.Tasks;

namespace SensGrid.src.Functions
{
    public class LoginAPI
    {
        private readonly UsersService usersService;

        public LoginAPI(UsersService usersService)
        {
            this.usersService = usersService;
        }

        [FunctionName("CreateUser")]
        public async Task<IActionResult> CreateUser(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "users")] HttpRequest req,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<LoginRequest>(requestBody);

            if (data == null || string.IsNullOrWhiteSpace(data.Email) || string.IsNullOrWhiteSpace(data.Password))
                return new BadRequestObjectResult("Email and password are required.");

            var email = data.Email.Trim();
            var user = await usersService.CreateUser(email, data.Password);
            if (user == null)
                return new ConflictObjectResult("A user with this email already exists.");

            return new CreatedResult($"/api/users/{user.Id}", new
            {
                user.Id,
                user.Email,
                user.CreatedAt
            });
        }

        [FunctionName("Login")]
        public async Task<IActionResult> Login(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "login")] HttpRequest req,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<LoginRequest>(requestBody);

            if (data == null || string.IsNullOrWhiteSpace(data.Email) || string.IsNullOrWhiteSpace(data.Password))
                return new BadRequestObjectResult("Email and password are required.");

            var user = await usersService.Authenticate(data.Email.Trim(), data.Password);
            if (user == null)
                return new UnauthorizedObjectResult("Invalid email or password.");

            return new OkObjectResult(new
            {
                user.Id,
                user.Email
            });
        }
    }
}
