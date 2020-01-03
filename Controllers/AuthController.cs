using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using sporthub.Data;
using sporthub.Dto;
using sporthub.Models;

namespace sporthub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SportHubContext _context;
        private readonly IAuth _iauth;
        private readonly ICheck _icheck;
        private readonly IConfiguration _config;

        public AuthController(SportHubContext context, IAuth iauth, ICheck icheck, IConfiguration config)
        {
            _context = context;
            _iauth = iauth;
            _icheck = icheck;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(DtoRegister user)
        {
           
            var hashedUser = new User()
            {
                Username = user.Username,
                Email = user.Email,
                Password = _iauth.Hashing(user.Password),
                FirstName = user.FirstName,
                LastName = user.LastName,
                TeamId = user.TeamId
            };

            //checking if username or email is unique
            var emailCheck = await _icheck.CheckEmail(hashedUser.Email);
            var usernameCheck = await _icheck.CheckUsername(hashedUser.Username);

            if (emailCheck && usernameCheck)
            {
                return BadRequest("Email and Username is already taken");
            }
            else if (emailCheck)
            {
                return BadRequest("Email is already taken");
            }
            else if (usernameCheck)
            {
                return BadRequest("Username is already taken");
            }

            await _context.User.AddAsync(hashedUser);
            await _context.SaveChangesAsync();

            return Ok(hashedUser);

        }

        [HttpPost("login")]
        public async Task<IActionResult> login(DtoLogin user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var authUser = await _iauth.Login(user.Username, user.Password);
            if (authUser == null)
            {
                return NotFound("Username or password is invalid");
            }

             var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, authUser.UserId.ToString()),
                new Claim(ClaimTypes.Name, authUser.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSettings:Token").Value));


        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials =creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token = tokenHandler.WriteToken(token)

        });
    }
}
}