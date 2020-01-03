using Microsoft.EntityFrameworkCore;
using sporthub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sporthub.Data
{
    public class Check : ICheck
    {
        private readonly SportHubContext _context;

        public Check(SportHubContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckEmail(String email)
        {
            var emailCheck = await _context.User.AnyAsync(a => a.Email.Equals(email));
            return emailCheck;
        }

        public async Task<bool> CheckUsername(String username)
        {
            var usernameCheck = await _context.User.AnyAsync(a => a.Username.Equals(username));
            return usernameCheck;
        }
    }
}
