using sporthub.Dto;
using sporthub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sporthub.Data
{
    public interface IAuth
    {
        Task<DtoAuthenticatedUser> Login(String username, String password);
        string Hashing(String password);

    }
}
