using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sporthub.Data
{
    public interface ICheck
    {
        Task<bool> CheckEmail(String email);
        Task<bool> CheckUsername(String username);
    }
}
