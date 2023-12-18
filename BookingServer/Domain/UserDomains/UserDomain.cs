using Domain.OrderDomains;
using Domain.PropertyDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.UserDomains
{
    public class UserDomain
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Fullname { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        public int? Role_id { get; set; }
        public List<PropertyDomain>? Properties { get; set; }
        public List<OrderDomain>? Orders { get; set;}
        public List<PropertyDomain>? PropertiesAccessed { get; set; }
    }
}
