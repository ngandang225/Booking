using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RoomTypeDomains
{
    public interface IRoomTypeRepository
    {
        public IEnumerable<RoomTypeDomain> GetAll();
        public RoomTypeDomain GetById(int id);
        public RoomTypeDomain AddRoomType(RoomTypeDomain roomType);
        public RoomTypeDomain UpdateRoomType(RoomTypeDomain roomType);
        public bool Delete(int id);
    }
}
