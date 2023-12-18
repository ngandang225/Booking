using Domain.PropertyFacilityDomains;
using Infrastructure.EntityModels.PropertyFacilityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.PropertyFacilityMappers
{
    public interface IPropertyFacilityMapper
    {
        public PropertyFacilityDomain ToDomain(PropertyFacility entity);
        public IEnumerable<PropertyFacilityDomain> ToDomains(IEnumerable<PropertyFacility> entities);
        public PropertyFacility ToEntity(PropertyFacilityDomain domain);
    }
    public class PropertyFacilityMapper : IPropertyFacilityMapper
    {
        public PropertyFacilityDomain ToDomain(PropertyFacility entity)
        {
            if (entity == null) return null;
            var newDomain = new PropertyFacilityDomain();
            newDomain.Property_Id = entity.Property_Id;
            newDomain.Facility_Id = entity.Facility_Id;
            return newDomain;
        }

        public IEnumerable<PropertyFacilityDomain> ToDomains(IEnumerable<PropertyFacility> entities)
        {
            if (entities == null) return Enumerable.Empty<PropertyFacilityDomain>();
            return entities.Select(e => ToDomain(e));
        }

        public PropertyFacility ToEntity(PropertyFacilityDomain domain)
        {
            var newEntity = new PropertyFacility();
            newEntity.Facility_Id = domain.Facility_Id;
            newEntity.Property_Id = domain.Property_Id;
            return newEntity;
        }
    }
}
