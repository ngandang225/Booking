using Domain.FacilityDomains;
using Domain.RoomFacilityDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IRoomFacilityServices
    {
        public IEnumerable<FacilityDomain> GetAll();
        public RoomFacilityDomain GetById(int roomId, int facilityId);
        public RoomFacilityDomain Add(RoomFacilityDomain roomFacility);
        public RoomFacilityDomain Update(RoomFacilityDomain roomFacility);
        public bool Delete(int roomId, int facilityId);
    }
    public class RoomFacilityServices : IRoomFacilityServices
    {
        private IRoomFacilityRepository roomFacilityServices;
        public RoomFacilityServices(IRoomFacilityRepository roomFacilityServices)
        {
            this.roomFacilityServices = roomFacilityServices;
        }
        public RoomFacilityDomain Add(RoomFacilityDomain roomFacility)
        {
            return roomFacilityServices.Add(roomFacility);
        }

        public bool Delete(int roomId, int facilityId)
        {
            return roomFacilityServices.Delete(roomId, facilityId);
        }

        public IEnumerable<FacilityDomain> GetAll()
        {
            return roomFacilityServices.GetAll();
        }

        public RoomFacilityDomain GetById(int roomId, int facilityId)
        {
            return roomFacilityServices.GetById(roomId, facilityId);
        }

        public RoomFacilityDomain Update(RoomFacilityDomain roomFacility)
        {
            return roomFacilityServices.Update(roomFacility);
        }
    }
}
