using Infrastructure.EntityModels.GeographycalPlaceModel;
using Infrastructure.EntityModels.PropertyModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.NeighborhoodModel
{
    public class Neighborhood
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        public string? Thumbnail { get; set; }
        public int? GeograhycalPlace_Id { get; set; }
        public ICollection<Property> Properties { get; set; }
        public GeographycalPlace GeographycalPlace { get; set; }
        public void Update(Neighborhood neighborhood)
        {
            foreach (var item in neighborhood.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(neighborhood) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(neighborhood));
            }
        }
    }
}
