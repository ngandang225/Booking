using Domain.FacilityDomains;
using Infrastructure.EntityModels.FacilityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.FacilityMappers
{

    public interface IFacilityMapper
    {
        public FacilityDomain ToDomain(Facility entity);
        public IEnumerable<FacilityDomain> ToDomains(IEnumerable<Facility> entities);
        public Facility ToEntity(FacilityDomain domain);
    }
    public class FacilityMapper : IFacilityMapper
    {
        public FacilityDomain ToDomain(Facility entity)
        {
            if (entity == null) return null;
            var newDomain = new FacilityDomain();
            newDomain.Id = entity.Id;
            newDomain.Name = entity.Name;
            newDomain.Icon = entity.Icon;
            newDomain.Type = entity.Type;
            return newDomain;
        }

        public IEnumerable<FacilityDomain> ToDomains(IEnumerable<Facility> entities)
        {
            if (entities == null) return null;
            return entities.Select(ToDomain);
        }

        public Facility ToEntity(FacilityDomain domain)
        {
            var newEntity = new Facility();
            newEntity.Name = domain.Name;
            newEntity.Icon = domain.Icon;
            newEntity.Id = domain.Id;
            newEntity.Type = domain.Type;
            return newEntity;
        }
    }
}
