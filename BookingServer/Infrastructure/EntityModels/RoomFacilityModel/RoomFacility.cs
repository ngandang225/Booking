using Infrastructure.EntityModels.FacilityModel;
using Infrastructure.EntityModels.RoomModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.RoomFacilityModel
{
    public class RoomFacility
    {
        public int Room_Id { get; set; }
        public int Facility_Id { get; set; }
        public Room Room { get; set; }
        public Facility Facility { get; set; }
        public void Update(RoomFacility rf)
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
