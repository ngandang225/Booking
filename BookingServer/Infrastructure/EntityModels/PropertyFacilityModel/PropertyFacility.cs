using Infrastructure.EntityModels.FacilityModel;
using Infrastructure.EntityModels.PropertyModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.PropertyFacilityModel
{
    public class PropertyFacility
    {
        public int Property_Id { get; set; }
        public int Facility_Id { get; set; }
        public Property Property { get; set; }
        public Facility Facility { get; set; }
        public void Update(PropertyFacility pf)
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
