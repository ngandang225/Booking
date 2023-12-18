using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.PropertyDomains
{
    public class PropertySort
    {
        public string? SortBy { get; set; } = "toppick";
        public bool? IsAscending { get; set; } = false;
    }
}
