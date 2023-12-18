using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.PropertyDomains
{
    public interface IPropertyRepository
    {
        public IEnumerable<PropertyDomain> GetProperties(PropertySearch search, PropertyFilter filter, PropertySort sort, PropertyPagination pagination);
        public PropertyDomain GetById(int id);
        public PropertyDomain AddProperty(PropertyDomain property);
        public PropertyDomain UpdateProperty(PropertyDomain property);
        public bool DeleteProperty(int id);
        public IEnumerable<PropertyDomain> GetAllByUserId(int userId);
    }
}
