using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.PropertyTypeDomains
{
    public interface IPropertyTypeRepository
    {
        public IEnumerable<PropertyTypeDomain> GetAll();
        public PropertyTypeDomain GetPropertyTypeById(int id);
        public PropertyTypeDomain Add(PropertyTypeDomain propertyType);
        public PropertyTypeDomain Update(PropertyTypeDomain propertyType);
        public bool Delete(int id);
    }
}
