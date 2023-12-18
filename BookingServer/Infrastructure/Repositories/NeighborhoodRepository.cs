using Domain.NeighborhoodDomains;
using Infrastructure.EntityModels.NeighborhoodModel;
using Infrastructure.Mapping.NeighborhoodMappers;
using Infrastructure.Mapping.PropertyMappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class NeighborhoodRepository : INeighborhoodRepository
    {
        private CoreContext _coreContext;
        private INeighborhoodMapper neighborhoodMapper;
        private IPropertyMapper propertyMapper;
        public NeighborhoodRepository(CoreContext coreContext, INeighborhoodMapper neighborhoodMapper, IPropertyMapper propertyMapper)
        {
            _coreContext = coreContext;
            this.neighborhoodMapper = neighborhoodMapper;
            this.propertyMapper = propertyMapper;
        }
        public NeighborhoodDomain Add(NeighborhoodDomain neighborhood)
        {
            var entity = _coreContext.Neighborhoods.FirstOrDefault(n => n.Id == neighborhood.Id);
            if (entity == null)
            {
                var newEntity = neighborhoodMapper.ToEntity(neighborhood);
                _coreContext.Neighborhoods.Add(newEntity);
                _coreContext.SaveChanges();
                return neighborhoodMapper.ToDomain(newEntity);
            }
            else return null;
        }

        public bool Delete(int id)
        {
            var entity = _coreContext.Neighborhoods.FirstOrDefault(n => n.Id == id);
            if (entity == null) return false;
            _coreContext.Remove(entity);
            _coreContext.SaveChanges();
            return true;
        }

        public IEnumerable<NeighborhoodDomain> GetAll()
        {
            var entities = _coreContext.Neighborhoods.Include(n => n.Properties).ThenInclude(p=>p.Rooms).ToList();
            var domains = new List<NeighborhoodDomain>();
            foreach (var entity in entities)
            {
                var domain = neighborhoodMapper.ToDomain(entity);
                //if (entity.Properties != null)
                //{
                //    domain.Properties = propertyMapper.ToDomains(entity.Properties).ToList();
                //}
                domain.Space = entity.Properties.Sum(p => p.Rooms.Count);
                domains.Add(domain);
            }
            return domains;
        }

        public NeighborhoodDomain GetById(int id)
        {
            var entity = _coreContext.Neighborhoods.FirstOrDefault(n => n.Id == id);
            if (entity == null) return null;
            var domain = neighborhoodMapper.ToDomain(entity);
            if (entity.Properties != null)
            {
                domain.Properties = propertyMapper.ToDomains(entity.Properties).ToList();
            }
            return domain;
        }

        public NeighborhoodDomain Update(NeighborhoodDomain neighborhood)
        {
            var entity = _coreContext.Neighborhoods.FirstOrDefault(n => n.Id == neighborhood.Id);
            if (entity == null) return null;
            var updateEntity = neighborhoodMapper.ToEntity(neighborhood);
            entity.Update(updateEntity);
            _coreContext.SaveChanges();
            var result = neighborhoodMapper.ToDomain(entity);
            if (entity.Properties != null)
            {
                result.Properties = propertyMapper.ToDomains(entity.Properties).ToList();
            }
            return result;
        }
    }
}
