using Domain.UserDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RoleDomains
{
    public class RoleDomain
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<UserDomain>? Users { get; set; }
    }
}
