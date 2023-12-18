using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.PropertyDomains
{
    public class PropertySearch
    {
        public int? Geographycal_Id { get; set; } 
        public DateTime? CheckInDate { get; set; } = DateTime.Now;
        public DateTime? CheckOutDate { get; set; } = DateTime.Now;
        public int? PeopleNum { get; set; } = 1;
    }
}
