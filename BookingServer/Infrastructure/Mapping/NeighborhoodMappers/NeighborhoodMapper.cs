using Domain.NeighborhoodDomains;
using Infrastructure.EntityModels.NeighborhoodModel;
using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.NeighborhoodMappers
{
    public interface INeighborhoodMapper
    {
        public NeighborhoodDomain ToDomain(Neighborhood entity);
        public IEnumerable<NeighborhoodDomain> ToDomains(IEnumerable<Neighborhood> entities);
        public Neighborhood ToEntity(NeighborhoodDomain domain);
    }
    public class NeighborhoodMapper : INeighborhoodMapper
    {
        public NeighborhoodDomain ToDomain(Neighborhood entity)
        {
            if (entity == null) return null;
            var newDomain = new NeighborhoodDomain();
            newDomain.Name = entity.Name;
            newDomain.Location = entity.Location;
            newDomain.Id = entity.Id;
            newDomain.Thumbnail = WebUtility.UrlDecode(entity.Thumbnail);
            newDomain.GeograhycalPlace_Id =entity.GeograhycalPlace_Id;
            return newDomain;
        }

        public IEnumerable<NeighborhoodDomain> ToDomains(IEnumerable<Neighborhood> entities)
        {
            if (entities == null) return null;
            return entities.Select(ToDomain);
        }

        public Neighborhood ToEntity(NeighborhoodDomain domain)
        {
            var entity = new Neighborhood();
            entity.Name = domain.Name;
            entity.Location = domain.Location;
            entity.Id = domain.Id;
            entity.Thumbnail = domain.Thumbnail;
            return entity;
        }
    }
}
