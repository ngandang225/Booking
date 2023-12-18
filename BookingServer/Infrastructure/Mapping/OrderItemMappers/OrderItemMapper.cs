using Domain.OrderItemDomains;
using Infrastructure.EntityModels.OrderItemModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.OrderItemMappers
{
    public interface IOrderItemMapper
    {
        public OrderItemDomain ToDomain(OrderItem entity);
        public IEnumerable<OrderItemDomain> ToDomains(IEnumerable<OrderItem> entities);
        public OrderItem ToEntity(OrderItemDomain domain);
        public IEnumerable<OrderItem> ToEntities(IEnumerable<OrderItemDomain> domains);
    }
    public class OrderItemMapper : IOrderItemMapper
    {
        public OrderItemDomain ToDomain(OrderItem entity)
        {
            if (entity == null) return null;
            var newDomain = new OrderItemDomain();
            newDomain.Id = entity.Id;
            newDomain.Order_Id = entity.Order_Id;
            newDomain.Room_Id = entity.Room_Id;
            newDomain.User_Id = entity.User_Id;
            newDomain.Price = entity.Price;
            return newDomain;
        }

        public IEnumerable<OrderItemDomain> ToDomains(IEnumerable<OrderItem> entities)
        {
            if (entities == null) return null;
            return entities.Select(ToDomain);
        }

        public OrderItem ToEntity(OrderItemDomain domain)
        {
            var newEntity = new OrderItem();
            newEntity.Price = domain.Price;
            newEntity.Order_Id = domain.Order_Id;
            newEntity.Room_Id = domain.Room_Id.Value;
            newEntity.User_Id = domain.User_Id;
            return newEntity;
        }
        public IEnumerable<OrderItem> ToEntities(IEnumerable<OrderItemDomain> domains )
        {
            if (domains == null) return null;
            return domains.Select(ToEntity);
        }
    }
}
