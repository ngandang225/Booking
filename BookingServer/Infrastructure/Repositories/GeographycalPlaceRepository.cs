using Domain.GeographycalPlaceDomains;
using Infrastructure.Mapping.GeographycalPlaceMappers;
using Infrastructure.Mapping.PropertyMappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class GeographycalPlaceRepository : IGeographycalPlaceRepository
    {
        private CoreContext _coreContext;
        private IGeographycalPlaceMapper _mapper;
        public GeographycalPlaceRepository(CoreContext context, IGeographycalPlaceMapper geographycalPlaceMapper)
        {
            _coreContext = context;
            _mapper = geographycalPlaceMapper;
        }
        public GeographycalPlaceDomain Add(GeographycalPlaceDomain geographycalPlace)
        {
            var entity = _mapper.ToEntity(geographycalPlace);
            _coreContext.GeographycalPlaces.Add(entity);
            _coreContext.SaveChanges();
            return _mapper.ToDomain(entity);
        }

        public void Delete(int id)
        {
             var entity = _coreContext.GeographycalPlaces.FirstOrDefault(dp => dp.Id == id);
            if (entity != null) {
                _coreContext.GeographycalPlaces.Remove(entity);
                _coreContext.SaveChanges();
            }
        }

        public IEnumerable<GeographycalPlaceDomain> GetAll()
        {
            var entities = _coreContext.GeographycalPlaces.Include(gp=>gp.Properties).ThenInclude(p=>p.Rooms).Include(en => en.Neighborhoods).ToList();
            var domains = new List<GeographycalPlaceDomain>();
            foreach (var entity in entities)
            {
                var domain = _mapper.ToDomain(entity);
                domain.Properties = null;
                domain.Space = entity.Properties.Sum(p => p.Rooms.Count);
                domains.Add(domain);
            }
            return domains;
        }

        public GeographycalPlaceDomain GetById(int id)
        {
            var entity = _coreContext.GeographycalPlaces.FirstOrDefault(dp => dp.Id == id);
            return _mapper.ToDomain(entity);
        }

        public GeographycalPlaceDomain Update(GeographycalPlaceDomain geographycalPlace)
        {
            var gpDoc = _coreContext.GeographycalPlaces.FirstOrDefault(en => en.Id == geographycalPlace.Id);
            if (gpDoc != null)
            {
                var entity = _mapper.ToEntity(geographycalPlace);
                gpDoc.Update(entity);
                _coreContext.SaveChanges();
                return _mapper.ToDomain(gpDoc);
            }
            else
            {
                return null;
            }
        }
    }
}
