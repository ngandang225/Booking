using Domain.FacilityDomains;
using Domain.OrderItemDomains;
using Domain.PriceListDomains;
using Domain.PropertyDomains;
using Domain.ReviewDomains;
using Domain.RoomTypeDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RoomDomains
{
    public class RoomDomain
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
        public float? ReviewScore { get; set; }
        public double? Price { get; set; }
        public string? Description { get; set; }
        public bool? IsAvailable { get; set; }
        public bool? IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
        public List<string>? Images { get; set; }
        public List<ReviewDomain>? Reviews { get; set; }
        public List<OrderItemDomain>? OrderItems { get; set; }
        public List<FacilityDomain>? Facilities { get; set; }
        public PropertyDomain? Property { get; set; }
        public List<PriceListDomain>? PriceLists { get; set; }
        public RoomTypeDomain? RoomType { get; set; }
        public void Update(RoomDomain room)
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
