using Infrastructure.EntityModels.RoomModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.RoomTypeModel
{
    public class RoomType
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Thumbnail { get; set; }
        public ICollection<Room> Rooms { get; set; }
        public void Update(RoomType rt)
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
