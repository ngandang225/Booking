using Domain.FacilityDomains;
using Domain.GeographycalPlaceDomains;
using Domain.NeighborhoodDomains;
using Domain.PropertyTypeDomains;
using Domain.RoomDomains;
using Domain.UserDomains;
using Domain.VoucherDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.PropertyDomains
{
    public class PropertyDomain
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
        public bool? IsDeleted { get; set; } = false;
        public double? Price { get; set; }
        public double? ReviewScore { get; set; }
        public double? Distance { get; set; } = 2;
        public UserDomain? Owner { get; set; }
        public List<UserDomain>? Staff { get; set; }
        public PropertyTypeDomain? PropertyType { get; set; }
        public List<FacilityDomain>? Facilities { get; set; }
        public GeographycalPlaceDomain? GeographycalPlace { get; set; }
        public List<VoucherDomain>? Vouchers { get; set; }
        public List<RoomDomain>? Rooms { get; set; }
        public List<NeighborhoodDomain>? Neighborhoods { get; set; }
        public void Update(PropertyDomain property)
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
