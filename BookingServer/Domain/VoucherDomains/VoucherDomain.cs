using Domain.PropertyDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.VoucherDomains
{
    public class VoucherDomain
    {
        public int Id { get; set; }
        public int? Scope { get; set; }
        public string? Name { get; set; }
        public int? Percentage { get; set; }
        public DateTime? Open_Date { get; set; }
        public DateTime? Close_Date { get; set; }
        public PropertyDomain? Property { get; set; }
    }
}
