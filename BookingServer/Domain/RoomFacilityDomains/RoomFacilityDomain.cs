using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RoomFacilityDomains
{
    public class RoomFacilityDomain
    {
        public int Room_Id { get; set; }
        public int Facility_Id { get; set; }
        public void Update(RoomFacilityDomain rf)
        {
            foreach (var item in rf.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(rf) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(rf));
            }
        }
    }
}
