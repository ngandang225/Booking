using Domain.NeighborhoodPropertyDomains;
using Infrastructure.EntityModels.NeighborhoodPropertyModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.NeighborhoodPropertyMappers
{
    public interface INeighborhoodPropertyMapper
    {
        public NeighborhoodPropertyDomain ToDomain(NeighborhoodProperty entity);
        public IEnumerable<NeighborhoodPropertyDomain> ToDomains(IEnumerable<NeighborhoodProperty> entities);
        public NeighborhoodProperty ToEntity(NeighborhoodPropertyDomain domain);
    }
    public class NeighborhoodPropertyMapper : INeighborhoodPropertyMapper
    {
        public NeighborhoodPropertyDomain ToDomain(NeighborhoodProperty entity)
        {
            if (entity == null) return null;
            var newDomain = new NeighborhoodPropertyDomain();
            newDomain.Neighborhood_Id = entity.Neighborhood_Id;
            newDomain.Property_Id = entity.Property_Id;
            return newDomain;
        }

        public IEnumerable<NeighborhoodPropertyDomain> ToDomains(IEnumerable<NeighborhoodProperty> entities)
        {
            if (entities == null) return Enumerable.Empty<NeighborhoodPropertyDomain>();
            return entities.Select(ToDomain);
        }

        public NeighborhoodProperty ToEntity(NeighborhoodPropertyDomain domain)
        {
            var newEntity = new NeighborhoodProperty();
            newEntity.Property_Id = domain.Property_Id;
            newEntity.Neighborhood_Id = domain.Neighborhood_Id;
            return (newEntity);
        }
    }
}
