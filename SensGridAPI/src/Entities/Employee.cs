using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SensGrid.src.Entities
{
    [Table("Employee")]
    public class Employee
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("firstname")]
        public string Firstname { get; set; }

        [Required]
        [Column("lastname")]
        public string Lastname { get; set; }

        [Required]
        [Column("email")]
        public string Email { get; set; }

        [Required]
        [Column("phone")]
        public string Phone { get; set; }

        [Required]
        [Column("role")]
        public string Role { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
