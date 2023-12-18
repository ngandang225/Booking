using Domain.RoomTypeDomains;
using Infrastructure.EntityModels.RoomTypeModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IRoomTypeServices
    {
        public IEnumerable<RoomTypeDomain> GetAll();
        public RoomTypeDomain GetById(int id);
        public RoomTypeDomain AddRoomType(RoomTypeDomain roomType);
        public RoomTypeDomain UpdateRoomType(RoomTypeDomain roomType);
        public bool Delete(int id);
    }
    public class RoomTypeServices : IRoomTypeServices
    {
        private IRoomTypeRepository roomTypeRepository;
        public RoomTypeServices(IRoomTypeRepository roomTypeRepository)
        {
            this.roomTypeRepository = roomTypeRepository;
        }
        public RoomTypeDomain AddRoomType(RoomTypeDomain roomType)
        {
            return roomTypeRepository.AddRoomType(roomType);

        }

        public bool Delete(int id)
        {
            return roomTypeRepository.Delete(id);

        }

        public IEnumerable<RoomTypeDomain> GetAll()
        {
            return roomTypeRepository.GetAll();

        }

        public RoomTypeDomain GetById(int id)
        {
            return roomTypeRepository.GetById(id);

        }

        public RoomTypeDomain UpdateRoomType(RoomTypeDomain roomType)
        {
            return roomTypeRepository.UpdateRoomType(roomType);

        }
    }
}
