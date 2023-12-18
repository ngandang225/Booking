using Domain.FacilityDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.PropertyFacilityDomains
{
    public interface IPropertyFacilityRepository
    {
        public IEnumerable<FacilityDomain> GetAll();
        public PropertyFacilityDomain Get(int facilityId, int propertyId);
        public PropertyFacilityDomain Add(PropertyFacilityDomain propertyFacility);
        public PropertyFacilityDomain Update(PropertyFacilityDomain propertyFacility);
        public bool Delete(int facilityId, int propertyId);
    }
}
