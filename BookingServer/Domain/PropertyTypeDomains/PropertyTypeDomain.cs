using Domain.PropertyDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.PropertyTypeDomains
{
    public class PropertyTypeDomain
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Thumbnail { get; set; }
        public List<PropertyDomain>? Properties { get; set; }
        public void Update(PropertyTypeDomain property)
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
