using Domain.GeographycalPlaceDomains;
using Domain.PropertyDomains;
using Domain.RoomDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.FacilityDomains
{
    public class FacilityDomain
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Icon { get; set; }
        public string? Type { get; set; }
        public List<RoomDomain>? Rooms { get; set; }
        public List<PropertyDomain>? Properties { get; set; }
        public GeographycalPlaceDomain? GeographycalPlace { get; set; }
        public void Update(FacilityDomain facility)
        {
            foreach (var item in facility.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(facility) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(facility));
            }
        }
    }
}
