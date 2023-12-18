using Domain.FacilityDomains;
using Domain.PropertyDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.PropertyFacilityDomains
{
    public class PropertyFacilityDomain
    {
        public int Property_Id { get; set; }
        public int Facility_Id { get; set; }
        public PropertyDomain? Property { get; set; }
        public FacilityDomain? Facility { get; set; }
        public void Update(PropertyFacilityDomain pf)
        {
            foreach (var item in pf.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(pf) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(pf));
            }
        }
    }
}
