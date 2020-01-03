using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sporthub.Models;

namespace sporthub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SportHubContext _context;

        public UserController(SportHubContext context)
        {
            _context = context;
        }

        [HttpGet("userId={userId}")]
        public async Task<IActionResult> GetTeamByUserId([FromRoute] int userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _context.User.FindAsync(userId);
            if (user == null)
            {
                return NotFound("UserId not found");
            }
            return Ok(user.TeamId);
        }
    }
}