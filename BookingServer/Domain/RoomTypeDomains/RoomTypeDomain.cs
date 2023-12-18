using Domain.RoomDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RoomTypeDomains
{
    public class RoomTypeDomain
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Thumbnail { get; set; }
        public List<RoomDomain>? Rooms { get; set; }
        public void Update(RoomTypeDomain rt)
        {
            foreach (var item in rt.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(rt) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(rt));
            }
        }
    }
}
