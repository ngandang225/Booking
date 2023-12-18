
using Domain.PropertyDomains;
using Domain.RoomDomains;
using Infrastructure.EntityModels.RoomModel;
using Infrastructure.Mapping.FacilityMappers;
using Infrastructure.Mapping.PropertyMappers;
using Infrastructure.Mapping.RoomMappers;
using Infrastructure.Mapping.RoomTypeMappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private CoreContext coreContext;
        private IPropertyMapper propertyMapper;
        private IRoomTypeMapper roomTypeMapper;
        private IRoomMapper roomMapper;
        private IFacilityMapper facilityMapper;
        public RoomRepository(CoreContext coreContext, IPropertyMapper propertyMapper, IRoomTypeMapper roomTypeMapper, IRoomMapper roomMapper, IFacilityMapper facilityMapper)
        {
            this.coreContext = coreContext;
            this.propertyMapper = propertyMapper;
            this.roomTypeMapper = roomTypeMapper;
            this.roomMapper = roomMapper;
            this.facilityMapper = facilityMapper;
        }

        public RoomDomain AddRoom(RoomDomain room)
        {
            var roomDoc = coreContext.Rooms.FirstOrDefault(r => r.Id == room.Id);
            if (roomDoc == null)
            {
                var newEntity = roomMapper.ToEntity(room);
                coreContext.Rooms.Add(newEntity);
                coreContext.SaveChanges();
                var domain = roomMapper.ToDomain(newEntity);
                if(newEntity.Facilities != null)
                {
                    domain.Facilities = facilityMapper.ToDomains(newEntity.Facilities).ToList();
                }    
                if(newEntity.Property != null)
                {
                    domain.Property = propertyMapper.ToDomain(newEntity.Property);
                }
                if(domain.RoomType != null)
                {
                    domain.RoomType = roomTypeMapper.ToDomain(newEntity.RoomType);
                }    
                return domain;
            }
            else return null;
        }

        public bool DeleteRoom(int id)
        {
            var roomDoc = coreContext.Rooms.FirstOrDefault(r => r.Id == id);
            if (roomDoc == null)
            {
                return false;
            }
            else
            {
                coreContext.Rooms.Remove(roomDoc);
                coreContext.SaveChanges();
                return true;
            }
        }

        public IEnumerable<RoomDomain> GetAllByPropertyId(int id)
        {
            var entities = coreContext.Rooms
                .Include(r => r.PriceLists)
                .Include(r => r.Facilities)
                .Include(r => r.RoomType)
                .Where(r => r.Property_Id == id);
            var domains = new List<RoomDomain>();
            foreach (var entity in entities)
            {
                var domain = roomMapper.ToDomain(entity);
                if (entity.Facilities != null)
                {
                    domain.Facilities = facilityMapper.ToDomains(entity.Facilities).ToList();
                }
                if (entity.Property != null)
                {
                    domain.Property = propertyMapper.ToDomain(entity.Property);
                }
                if (domain.RoomType != null)
                {
                    domain.RoomType = roomTypeMapper.ToDomain(entity.RoomType);
                }
                domains.Add(domain);
            }
            return domains;
        }
        public IEnumerable<RoomDomain> GetAvailableRoomsOfProperty(int propertyId,PropertySearch propertySearch)
        {
            if(propertySearch!= null && propertySearch.CheckInDate != null && propertySearch.CheckOutDate !=null)
            {
                var entities = coreContext.Rooms.Include(r => r.OrderItems).ThenInclude(oi => oi.Order)
                    .Where(r => r.Property_Id == propertyId &&  (r.OrderItems.All(oi => oi.Order.Check_In_Date >= propertySearch.CheckOutDate || oi.Order.Check_Out_Date <= propertySearch.CheckInDate)) || r.OrderItems.Count==0);
                
                return roomMapper.ToDomains(entities);
            }
            return null;
        }
        public bool IsAvailable(int roomId, DateTime checkIn, DateTime checkOut)
        {
            var entity = coreContext.Rooms.Include(r => r.OrderItems).ThenInclude(oi => oi.Order)
                .Where(r => r.Id == roomId &&  (r.OrderItems.All(oi => oi.Order.Check_In_Date > checkOut|| oi.Order.Check_Out_Date < checkIn)||r.OrderItems.Count ==0))
                .FirstOrDefault();
            if(entity == null) return false;
            return true;
        }
        public RoomDomain GetById(int id)
        {
            var entity = coreContext.Rooms
                .Include(r => r.PriceLists)
                .Include(r => r.Facilities)
                .Include(r => r.RoomType)
                .FirstOrDefault(r => r.Id == id);
            var domain = roomMapper.ToDomain(entity);
            if (entity.Facilities != null)
            {
                domain.Facilities = facilityMapper.ToDomains(entity.Facilities).ToList();
            }
            if (entity.Property != null)
            {
                domain.Property = propertyMapper.ToDomain(entity.Property);
            }
            if (domain.RoomType != null)
            {
                domain.RoomType = roomTypeMapper.ToDomain(entity.RoomType);
            }
            return domain;
        }

        public RoomDomain UpdateRoom(RoomDomain room)
        {
            var roomDoc = coreContext.Rooms.FirstOrDefault(r => r.Id == room.Id);
            if (roomDoc == null)
            {
                return null;
            }
            else
            {
                var entity = roomMapper.ToEntity(room);
                roomDoc.Update(entity);
                coreContext.SaveChanges();
                var domain = roomMapper.ToDomain(roomDoc);
                if (roomDoc.Facilities != null)
                {
                    domain.Facilities = facilityMapper.ToDomains(roomDoc.Facilities).ToList();
                }
                if (entity.Property != null)
                {
                    domain.Property = propertyMapper.ToDomain(roomDoc.Property);
                }
                if (domain.RoomType != null)
                {
                    domain.RoomType = roomTypeMapper.ToDomain(roomDoc.RoomType);
                }
                return domain;
            }
        }
    }
}
