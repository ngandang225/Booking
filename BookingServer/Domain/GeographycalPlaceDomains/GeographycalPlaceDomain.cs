using Domain.NeighborhoodDomains;
using Domain.PropertyDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.GeographycalPlaceDomains
{
    public class GeographycalPlaceDomain
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Center_Location { get; set; }
        public string? Thumbnail { get; set; }
        public int? Space { get; set; }
        public List<PropertyDomain>? Properties { get; set; }
        public List<NeighborhoodDomain>? Neighborhoods { get; set; }
        public void Update(GeographycalPlaceDomain gp)
        {
            foreach (var item in gp.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(gp) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(gp));
            }
        }
    }
}
