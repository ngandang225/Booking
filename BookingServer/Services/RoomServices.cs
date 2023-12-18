using Domain.RoomDomains;
using Infrastructure.EntityModels.RoomModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IRoomServices
    {
        public IEnumerable<RoomDomain> GetAllByPropertyId(int id);
        public RoomDomain GetById(int id);
        public RoomDomain AddRoom(RoomDomain room);
        public RoomDomain UpdateRoom(RoomDomain room);
        public bool DeleteRoom(int id);
    }
    public class RoomServices : IRoomServices
    {
        private IRoomRepository roomRepository;
        public RoomServices(IRoomRepository roomRepository)
        {
            this.roomRepository = roomRepository;
        }
        public RoomDomain AddRoom(RoomDomain room)
        {
            return roomRepository.AddRoom(room);

        }

        public bool DeleteRoom(int id)
        {
            return roomRepository.DeleteRoom(id);

        }

        public IEnumerable<RoomDomain> GetAllByPropertyId(int id)
        {
            return roomRepository.GetAllByPropertyId(id);

        }

        public RoomDomain GetById(int id)
        {
            return roomRepository.GetById(id);

        }

        public RoomDomain UpdateRoom(RoomDomain room)
        {
            return roomRepository.UpdateRoom(room);

        }
    }
}
