using Infrastructure.EntityModels.NeighborhoodModel;
using Infrastructure.EntityModels.PropertyModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.GeographycalPlaceModel
{
    public class GeographycalPlace
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Center_Location { get; set; }
        public string? Thumbnail { get; set; }
        public ICollection<Property> Properties { get; set; }
        public ICollection<Neighborhood> Neighborhoods { get; set; }
        public void Update(GeographycalPlace gp)
        {
            foreach (var item in gp.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(gp) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(gp));
            }
        }
    }
}
