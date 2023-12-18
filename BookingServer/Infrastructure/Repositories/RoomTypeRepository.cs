using Domain.RoomTypeDomains;
using Infrastructure.Mapping.RoomTypeMappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class RoomTypeRepository : IRoomTypeRepository
    {
        private CoreContext coreContext;
        private IRoomTypeMapper roomTypeMapper;
        public RoomTypeRepository(CoreContext coreContext, IRoomTypeMapper roomTypeMapper)
        {
            this.coreContext = coreContext;
            this.roomTypeMapper = roomTypeMapper;
        }
        public RoomTypeDomain AddRoomType(RoomTypeDomain roomType)
        {
            var rtDoc = coreContext.RoomTypes.FirstOrDefault(rt => rt.Id == roomType.Id);
            if (rtDoc != null)
            {
                return null;
            }
            else
            {
                var entity = roomTypeMapper.ToEntity(roomType);
                coreContext.RoomTypes.Add(entity);
                coreContext.SaveChanges();
                return roomTypeMapper.ToDomain(entity);
            }
        }

        public bool Delete(int id)
        {
            var rtDoc = coreContext.RoomTypes.Include(rt => rt.Rooms).FirstOrDefault(rt => rt.Id == id);
            if (rtDoc != null)
            {
                coreContext.RoomTypes.Remove(rtDoc);
                coreContext.SaveChanges();
                return true;
            }
            else
            { return false; }
        }

        public IEnumerable<RoomTypeDomain> GetAll()
        {
            var entities = coreContext.RoomTypes;
            return roomTypeMapper.ToDomains(entities);
        }

        public RoomTypeDomain GetById(int id)
        {
            var entity = coreContext.RoomTypes.FirstOrDefault(rt => rt.Id == id);
            return roomTypeMapper.ToDomain(entity);
        }

        public RoomTypeDomain UpdateRoomType(RoomTypeDomain roomType)
        {
            var rtDoc = coreContext.RoomTypes.FirstOrDefault(rt => rt.Id == roomType.Id);
            if (rtDoc != null)
            {
                var entity = roomTypeMapper.ToEntity(roomType);
                rtDoc.Update(entity);
                coreContext.SaveChanges();
                return roomTypeMapper.ToDomain(rtDoc);
            }
            else
            {
                return null;
            }
        }
    }
}
