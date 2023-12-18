using Infrastructure.EntityModels.FacilityModel;
using Infrastructure.EntityModels.OrderItemModel;
using Infrastructure.EntityModels.PriceListModel;
using Infrastructure.EntityModels.PropertyModel;
using Infrastructure.EntityModels.ReviewModel;
using Infrastructure.EntityModels.RoomTypeModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.RoomModel
{
    public class Room
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Property_Id { get; set; }
        public int? Type_Id { get; set; }
        public int? Single_Bed { get; set; }
        public int? Double_Bed { get; set; }
        public int? Room_Number { get; set; }
        public int? Floor { get; set; }
        public double? Area { get; set; }
        public double? Price { get; set; }
        public string? Description { get; set; }
        public List<string>? Images { get; set; }
        public float? ReviewScore { get; set; }
        public bool? IsDeleted  { get; set; } =false;
        public DateTime? DeletedAt { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public ICollection<Facility> Facilities { get; set; }
        public Property Property { get; set; }
        public ICollection<PriceList> PriceLists { get; set; }  
        public RoomType RoomType { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public DateTime? TrackVersion { get; set; }
        public void Update(Room room)
        {
            foreach (var item in room.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(room) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(room));
            }
        }
    }
}
