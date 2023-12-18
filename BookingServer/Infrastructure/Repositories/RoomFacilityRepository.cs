using Domain.FacilityDomains;
using Domain.RoomFacilityDomains;
using Infrastructure.EntityModels.FacilityModel;
using Infrastructure.EntityModels.RoomFacilityModel;
using Infrastructure.Mapping.FacilityMappers;
using Infrastructure.Mapping.RoomFacilityMappers;
using Infrastructure.Mapping.RoomMappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class RoomFacilityRepository : IRoomFacilityRepository
    {
        private CoreContext coreContext;
        private IRoomFacilityMapper roomFacilityMapper;
        private IRoomMapper roomMapper;
        private IFacilityMapper facilityMapper;
        public RoomFacilityRepository(CoreContext coreContext, IRoomFacilityMapper roomFacilityMapper,IRoomMapper roomMapper, IFacilityMapper facilityMapper)
        {
            this.coreContext = coreContext;
            this.roomMapper = roomMapper;
            this.facilityMapper = facilityMapper;
            this.roomFacilityMapper = roomFacilityMapper;
        }
        public RoomFacilityDomain Add(RoomFacilityDomain roomFacility)
        {
            var rfDoc = coreContext.RoomsFacility.FirstOrDefault(rf => rf.Facility_Id == roomFacility.Facility_Id && rf.Room_Id == roomFacility.Room_Id);
            if (rfDoc == null)
            {
                var entity = roomFacilityMapper.ToEntity(roomFacility);
                coreContext.RoomsFacility.Add(entity);
                coreContext.SaveChanges();
                return roomFacilityMapper.ToDomain(entity);
            }
            else return null;
        }

        public bool Delete(int roomId, int facilityId)
        {
            var rfDoc = coreContext.RoomsFacility.FirstOrDefault(rf => rf.Facility_Id == facilityId && rf.Room_Id == roomId);
            if(rfDoc == null)
            {
                return false;
            }
            else
            {
                coreContext.RoomsFacility.Remove(rfDoc);
                coreContext.SaveChanges();
                return true;
            }
        }

        public IEnumerable<FacilityDomain> GetAll()
        {
            var entities = coreContext.RoomsFacility.Include(rf => rf.Facility).GroupBy(e => e.Facility_Id);
            var facilities = new List<Facility>();
            foreach(var entity in entities)
            {
                var facility = entity.FirstOrDefault();
                if(facility!=null)
                facilities.Add(facility.Facility);
            }
            return facilityMapper.ToDomains(facilities);
        }

        public RoomFacilityDomain GetById(int roomId, int facilityId)
        {
            throw new NotImplementedException();
        }

        public RoomFacilityDomain Update(RoomFacilityDomain roomFacility)
        {
            var rfDoc = coreContext.RoomsFacility.FirstOrDefault(rf => rf.Facility_Id == roomFacility.Facility_Id && rf.Room_Id == roomFacility.Room_Id);
            if( rfDoc == null )
            {
                return null;
            }
            else
            {
                var entity = roomFacilityMapper.ToEntity(roomFacility);
                rfDoc.Update(entity);
                coreContext.SaveChanges();
                return roomFacilityMapper.ToDomain(entity);
            }    
        }
    }
}
