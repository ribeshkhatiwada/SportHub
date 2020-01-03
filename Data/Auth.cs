using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using sporthub.Dto;
using sporthub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sporthub.Data
{
    public class Auth : IAuth
    {
        private readonly SportHubContext _context;
        public Auth(SportHubContext context)
        {
            _context = context;
        }

        public async Task<DtoAuthenticatedUser> Login(String username, String password)
        {
            var user = await _context.User.FirstOrDefaultAsync(y => y.Username.Equals(username));
            if (user == null)
            {
                return null;
            }

            if(password != null)
            {
                var hashedPassword = Hashing(password);
                //if user password does not match with hashedPassword
                if (!user.Password.Equals(hashedPassword))
                {
                    return null;
                }

                var dtoUser = new DtoAuthenticatedUser() { UserId = user.UserId, Username = user.Username };
                return dtoUser;
            }

            return null;

        }
        public string Hashing(String password)
        {
            // generate a 128 - bit salt using a secure PRNG
            byte[] salt = Encoding.Unicode.GetBytes("pseudopseudohypoparathyroidism");

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            Console.WriteLine($"Hashed: {hashed}");
            return hashed;
        }
    }
}
