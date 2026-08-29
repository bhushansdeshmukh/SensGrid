using Microsoft.EntityFrameworkCore;

namespace SensGrid.src.Entities
{
    public class SensgridContext : DbContext
    {
        public SensgridContext()
        {
        }

        public SensgridContext(DbContextOptions<SensgridContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = Environment.GetEnvironmentVariable("SqlConnectionString")
                    ?? Environment.GetEnvironmentVariable("DefaultConnection")
                    ?? "Server=(localdb)\\MSSQLLocalDB;Database=Sensgrid;Trusted_Connection=True;TrustServerCertificate=True;";

                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee");
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Id).HasColumnName("id");
                entity.Property(x => x.Firstname).HasColumnName("firstname");
                entity.Property(x => x.Lastname).HasColumnName("lastname");
                entity.Property(x => x.Email).HasColumnName("email");
                entity.Property(x => x.Phone).HasColumnName("phone");
                entity.Property(x => x.Role).HasColumnName("role");
                entity.Property(x => x.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("getdate()");
            });
        }
    }
}
