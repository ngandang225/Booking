using Domain.PropertyDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RoomDomains
{
    public interface IRoomRepository
    {
        public IEnumerable<RoomDomain> GetAllByPropertyId(int id);
        public RoomDomain GetById(int id);
        public RoomDomain AddRoom(RoomDomain  room);
        public RoomDomain UpdateRoom(RoomDomain room);
        public IEnumerable<RoomDomain> GetAvailableRoomsOfProperty(int propertyId, PropertySearch propertySearch);
        public bool DeleteRoom(int id);
        public bool IsAvailable(int roomId, DateTime checkIn, DateTime checkOut);
    }
}
