using Infrastructure.EntityModels.FacilityModel;
using Infrastructure.EntityModels.GeographycalPlaceModel;
using Infrastructure.EntityModels.NeighborhoodModel;
using Infrastructure.EntityModels.OrderItemModel;
using Infrastructure.EntityModels.PropertyFacilityModel;
using Infrastructure.EntityModels.PropertyTypeModel;
using Infrastructure.EntityModels.RoomModel;
using Infrastructure.EntityModels.UserModel;
using Infrastructure.EntityModels.VoucherModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.PropertyModel
{
    public class Property
    {
        public int Id { get; set; }
        public int? Type_Id { get; set; }
        public int? Geographycal_Id { get; set; }
        public int? Owner_Id { get; set; }
        public string? Address { get; set; }
        public string? Location { get; set; }
        public string? Description { get; set; }
        public List<string>? Images { get; set; }
        public string? Policy { get; set; }
        public string? Name { get; set; }
        public bool? IsDeleted { get; set; }
        public User Owner { get; set; }
        public ICollection<User> Staff { get; set; }
        public PropertyType PropertyType { get; set; }
        public ICollection<Facility> Facilities { get; set; }
        public GeographycalPlace GeographycalPlace { get; set; }
        public ICollection<Voucher> Vouchers { get; set; }
        public ICollection<Room> Rooms { get; set; }
        public List<Neighborhood> Neighborhoods { get; set; }

        public void Update(Property property)
        {
            foreach (var item in property.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(property) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(property));
            }
        }
    }
}
