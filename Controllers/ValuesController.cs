using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using sporthub.Models;

namespace Sportshub.api.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]   
    public class ValuesController : ControllerBase
    {
        private readonly SportHubContext _context;
        public ValuesController(SportHubContext context)
        {
            _context = context;

        }

    
        // GET api/values
        [HttpGet("test")]
        public async Task<IActionResult> GetValues()
        {

            var values = await _context.Values.ToListAsync();

            return Ok(values);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(value);
        }
        [AllowAnonymous]
        [Route("/api/teams")]
        [HttpPost]
        
        
        public void Post([FromBody] Value value)
        {
            _context.Values.Add(value);
            _context.SaveChanges();

        }

      

        [HttpGet("getTeamId/{id}")]
        public async Task<IActionResult> getTeamId([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var ids = await _context.User.FindAsync(id);
            if(ids == null)
            {
                return NotFound("User not found");
            }

            return Ok(ids.TeamId);
        }
        }
    }

