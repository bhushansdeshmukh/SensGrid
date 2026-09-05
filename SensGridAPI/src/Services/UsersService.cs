using Microsoft.EntityFrameworkCore;
using SensGrid.src.Entities;
using System.Security.Cryptography;

namespace SensGrid.src.Services
{
    public class UsersService
    {
        private const int PasswordIterations = 100000;
        private readonly SensgridContext dbcontext;

        public UsersService(SensgridContext dbContext)
        {
            dbcontext = dbContext;
        }

        public async Task<UserAccount> Authenticate(string email, string password)
        {
            var user = await dbcontext.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Email == email);

            if (user == null || !VerifyPassword(password, user.Password))
                return null;

            return user;
        }

        public async Task<UserAccount> CreateUser(string email, string password)
        {
            var existingUser = await dbcontext.Users
                .SingleOrDefaultAsync(x => x.Email == email);

            if (existingUser != null)
                return null;

            var user = new UserAccount
            {
                Email = email,
                Password = HashPassword(password),
                CreatedAt = DateTime.UtcNow
            };

            dbcontext.Users.Add(user);
            await dbcontext.SaveChangesAsync();
            return user;
        }

        private static string HashPassword(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(16);
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                password,
                salt,
                PasswordIterations,
                HashAlgorithmName.SHA256,
                32);

            return $"pbkdf2${PasswordIterations}${Convert.ToBase64String(salt)}${Convert.ToBase64String(hash)}";
        }

        private static bool VerifyPassword(string password, string storedPassword)
        {
            var parts = storedPassword?.Split('$');
            if (parts == null || parts.Length != 4 || parts[0] != "pbkdf2" ||
                !int.TryParse(parts[1], out var iterations))
            {
                return false;
            }

            try
            {
                var salt = Convert.FromBase64String(parts[2]);
                var expectedHash = Convert.FromBase64String(parts[3]);
                var actualHash = Rfc2898DeriveBytes.Pbkdf2(
                    password,
                    salt,
                    iterations,
                    HashAlgorithmName.SHA256,
                    expectedHash.Length);

                return CryptographicOperations.FixedTimeEquals(actualHash, expectedHash);
            }
            catch (FormatException)
            {
                return false;
            }
        }
    }
}
