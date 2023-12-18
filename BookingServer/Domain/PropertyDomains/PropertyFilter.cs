using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.PropertyDomains
{
    public class PropertyFilter
    {
        public int? Id { get; set; }
        public List<int>? TypeIds { get; set; }
        public int? GeographycalId { get; set; }
        public string? Address { get; set; }
        public int? Distance { get; set; }
        public bool? IsDeleted { get; set; }
        public List<int>? NeighborhoodIds { get; set; }
        public List<int>? RoomFacilityIds { get; set; }
        public List<int>? FacilityIds { get; set; }
        public int? ReviewRate { get; set; }
        public double? PriceFrom { get; set; }
        public double? PriceTo { get; set; }

    }
}
