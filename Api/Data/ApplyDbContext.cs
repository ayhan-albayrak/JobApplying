using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class ApplyDbContext :DbContext
    {
        public ApplyDbContext(DbContextOptions<ApplyDbContext> options) :base(options)
        {
            
        }

        public DbSet<JobApplication> JobApplications { get; set; }   


    }
}
