using Infrastructure.EntityModels.PropertyModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.PropertyTypeModel
{
    public class PropertyType
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Thumbnail { get; set; }
        public ICollection<Property> Properties { get; set; }
        public void Update(PropertyType propertyType)
        {
            foreach (var item in propertyType.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(propertyType) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(propertyType));
            }
        }
    }
}
