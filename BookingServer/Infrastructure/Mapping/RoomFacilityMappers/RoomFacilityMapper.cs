using Domain.RoomFacilityDomains;
using Infrastructure.EntityModels.RoomFacilityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.RoomFacilityMappers
{
    public interface IRoomFacilityMapper
    {
        public RoomFacilityDomain ToDomain(RoomFacility entity);
        public IEnumerable<RoomFacilityDomain> ToDomains(IEnumerable<RoomFacility> entities);
        public RoomFacility ToEntity(RoomFacilityDomain domain);
    }
    public class RoomFacilityMapper : IRoomFacilityMapper
    {
        public RoomFacilityDomain ToDomain(RoomFacility entity)
        {
            if (entity == null) return null;
            var newDomain = new RoomFacilityDomain();
            newDomain.Facility_Id = entity.Facility_Id;
            newDomain.Room_Id = entity.Room_Id;
            return newDomain;
        }

        public IEnumerable<RoomFacilityDomain> ToDomains(IEnumerable<RoomFacility> entities)
        {
            if (entities == null) return Enumerable.Empty<RoomFacilityDomain>();
            return entities.Select(ToDomain);
        }

        public RoomFacility ToEntity(RoomFacilityDomain domain)
        {
            var newEntity = new RoomFacility();
            newEntity.Facility_Id = domain.Facility_Id;
            newEntity.Room_Id = domain.Room_Id;
            return newEntity;
        }
    }
}
