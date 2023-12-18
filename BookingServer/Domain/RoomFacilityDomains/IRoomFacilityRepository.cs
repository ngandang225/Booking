using Domain.FacilityDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RoomFacilityDomains
{
    public interface IRoomFacilityRepository
    {
        public IEnumerable<FacilityDomain> GetAll();
        public RoomFacilityDomain GetById(int roomId, int facilityId);
        public RoomFacilityDomain Add(RoomFacilityDomain roomFacility);
        public RoomFacilityDomain Update(RoomFacilityDomain roomFacility);
        public bool Delete(int roomId, int facilityId);
    }
}
