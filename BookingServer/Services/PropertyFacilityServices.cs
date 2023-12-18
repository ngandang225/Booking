using Domain.FacilityDomains;
using Domain.PropertyFacilityDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IPropertyFacilityServices
    {
        public IEnumerable<FacilityDomain> GetAll();
        public PropertyFacilityDomain Get(int facilityId, int propertyId);
        public PropertyFacilityDomain Add(PropertyFacilityDomain propertyFacility);
        public PropertyFacilityDomain Update(PropertyFacilityDomain propertyFacility);
        public bool Delete(int facilityId, int propertyId);
    }
    public class PropertyFacilityServices : IPropertyFacilityServices
    {
        private IPropertyFacilityRepository propertyFacilityRepository;
        public PropertyFacilityServices(IPropertyFacilityRepository propertyFacilityRepository)
        {
            this.propertyFacilityRepository = propertyFacilityRepository;
        }
        public PropertyFacilityDomain Add(PropertyFacilityDomain propertyFacility)
        {
            return propertyFacilityRepository.Add(propertyFacility);
        }

        public bool Delete(int facilityId, int propertyId)
        {
            return propertyFacilityRepository.Delete(facilityId, propertyId);
        }

        public PropertyFacilityDomain Get(int facilityId, int propertyId)
        {
            return propertyFacilityRepository.Get(facilityId, propertyId);
        }

        public IEnumerable<FacilityDomain> GetAll()
        {
            return propertyFacilityRepository.GetAll();
        }

        public PropertyFacilityDomain Update(PropertyFacilityDomain propertyFacility)
        {
            return propertyFacilityRepository.Update(propertyFacility);
        }
    }
}
