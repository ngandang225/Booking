using Domain.FacilityDomains;
using Infrastructure.Mapping.FacilityMappers;
using Infrastructure.Mapping.PropertyMappers;
using Infrastructure.Mapping.RoomMappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class FacilityRepository : IFacilityRepository
    {
        private CoreContext coreContext;
        private IPropertyMapper propertyMapper;
        private IRoomMapper roomMapper;
        private IFacilityMapper facilityMapper;
        public FacilityRepository(CoreContext coreContext, IPropertyMapper propertyMapper, IRoomMapper roomMapper, IFacilityMapper facilityMapper)
        {
            this.coreContext = coreContext;
            this.propertyMapper = propertyMapper;
            this.roomMapper = roomMapper;
            this.facilityMapper = facilityMapper;
        }
        public FacilityDomain AddFacility(FacilityDomain facility)
        {
            var facilityDoc = coreContext.Facilities
                .FirstOrDefault(f => f.Id == facility.Id);
            if (facilityDoc == null)
            {
                var entity = facilityMapper.ToEntity(facility);
                coreContext.Facilities.Add(entity);
                coreContext.SaveChanges();
                return facilityMapper.ToDomain(entity);
            }
            else return null;
        }

        public bool DeleteFacility(int id)
        {
            var facilityDoc = coreContext.Facilities
                .Include(f => f.Properties)
                .Include(f => f.Rooms)
                .FirstOrDefault(f => f.Id == id);
            if (facilityDoc == null)
            { return false; }
            else
            {
                coreContext.Facilities.Remove(facilityDoc);
                coreContext.SaveChanges();
                return true;
            }
        }

        public IEnumerable<FacilityDomain> GetAll()
        {
            var entities = coreContext.Facilities;
            var domains = new List<FacilityDomain>();
            foreach (var entity in entities)
            {
                var domain = facilityMapper.ToDomain(entity);
                if (entity.Properties != null)
                    domain.Properties = propertyMapper.ToDomains(entity.Properties).ToList();
                if (entity.Rooms != null)
                    domain.Rooms = roomMapper.ToDomains(entity.Rooms).ToList();
                domains.Add(domain);
            }
            return domains;
        }

        public FacilityDomain GetById(int id)
        {
            var entity = coreContext.Facilities
                .FirstOrDefault(f => f.Id == id);
            var domain = facilityMapper.ToDomain(entity);
            //if (entity.Properties != null)
            //    domain.Properties = propertyMapper.ToDomains(entity.Properties).ToList();
            //if (entity.Rooms != null)
            //    domain.Rooms = roomMapper.ToDomains(entity.Rooms).ToList();
            return domain;
        }

        public FacilityDomain UpdateFacility(FacilityDomain facility)
        {
            var facilityDoc = coreContext.Facilities
            .FirstOrDefault(f => f.Id == facility.Id);
            if (facilityDoc == null)
            {
                return null;
            }
            else
            {
                var entity = facilityMapper.ToEntity(facility);
                facilityDoc.Update(entity);
                coreContext.SaveChanges();
                var domain = facilityMapper.ToDomain(facilityDoc);
                //if (entity.Properties != null)
                //    domain.Properties = propertyMapper.ToDomains(entity.Properties).ToList();
                //if (entity.Rooms != null)
                //    domain.Rooms = roomMapper.ToDomains(entity.Rooms).ToList();
                return domain;
            }
        }
    }
}
