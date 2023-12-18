using Infrastructure.EntityModels.PropertyFacilityModel;
using Infrastructure.EntityModels.PropertyModel;
using Infrastructure.EntityModels.RoomModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.FacilityModel
{
    public class Facility
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Icon { get; set; }
        public string? Type { get; set; }
        public ICollection<Room> Rooms { get; set; }
        public ICollection<Property> Properties { get; set; }
        public void Update(Facility facility)
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
