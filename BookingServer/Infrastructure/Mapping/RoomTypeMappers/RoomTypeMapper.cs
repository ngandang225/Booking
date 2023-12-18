using Domain.RoomTypeDomains;
using Infrastructure.EntityModels.RoomTypeModel;
using Infrastructure.Mapping.RoomMappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.RoomTypeMappers
{
    public interface IRoomTypeMapper
    {
        public RoomTypeDomain ToDomain(RoomType entity);
        public IEnumerable<RoomTypeDomain> ToDomains(IEnumerable<RoomType> entities);
        public RoomType ToEntity(RoomTypeDomain domain);
    }
    public class RoomTypeMapper : IRoomTypeMapper
    {
        private IRoomMapper roomMapper;
        public RoomTypeMapper(IRoomMapper roomMapper)
        {
            this.roomMapper = roomMapper;
        }
        public RoomTypeDomain ToDomain(RoomType entity)
        {
            if (entity == null) return null;
            var newDomain = new RoomTypeDomain();
            newDomain.Id = entity.Id;
            newDomain.Name = entity.Name;
            newDomain.Thumbnail = entity.Thumbnail;
            if(entity.Rooms !=null)
            {
                newDomain.Rooms = roomMapper.ToDomains(entity.Rooms).ToList();
            }    
            return newDomain;
        }

        public IEnumerable<RoomTypeDomain> ToDomains(IEnumerable<RoomType> entities)
        {
            if (entities == null) return null;
            return entities.Select(e => ToDomain(e));
        }

        public RoomType ToEntity(RoomTypeDomain domain)
        {
            var newEntity = new RoomType();
            newEntity.Name = domain.Name;
            newEntity.Thumbnail = domain.Thumbnail;
            newEntity.Id = domain.Id;
            return newEntity;
        }
    }
}
