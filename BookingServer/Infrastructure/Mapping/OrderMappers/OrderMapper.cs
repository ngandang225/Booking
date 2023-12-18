using Domain.OrderDomains;
using Infrastructure.EntityModels.OrderModel;
using Infrastructure.Mapping.OrderItemMappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.OrderMappers
{
    public interface IOrderMapper
    {
        public OrderDomain ToDomain(Order entity);
        public IEnumerable<OrderDomain> ToDomains(IEnumerable<Order> entities);
        public Order ToEntity(OrderDomain domain);
    }
    public class OrderMapper : IOrderMapper
    {
        private IOrderItemMapper orderItemMapper;
        public OrderMapper(IOrderItemMapper orderItemMapper)
        {
            this.orderItemMapper = orderItemMapper;
        }
        public OrderDomain ToDomain(Order entity)
        {
            if (entity == null) return null;
            var newDomain = new OrderDomain();
            newDomain.Id = entity.Id;
            newDomain.User_Id = entity.User_Id;
            newDomain.Order_Date = entity.Order_Date;
            newDomain.Check_In_Date = entity.Check_In_Date;
            newDomain.Check_Out_Date = entity.Check_Out_Date;
            newDomain.Customer_Name = entity.Customer_Name;
            newDomain.Email = entity.Email;
            newDomain.Status = entity.Status;
            if(entity.OrderItems != null)
            {
                newDomain.OrderItems = orderItemMapper.ToDomains(entity.OrderItems).ToList();
            }    
            return newDomain;
        }

        public IEnumerable<OrderDomain> ToDomains(IEnumerable<Order> entities)
        {
            if (entities == null) return null;
            return entities.Select(ToDomain);
        }

        public Order ToEntity(OrderDomain domain)
        {
            var newEntity = new Order();
            newEntity.User_Id = domain.User_Id;
            newEntity.Status = domain.Status;
            newEntity.Customer_Name = domain.Customer_Name;
            newEntity.Email = domain.Email;
            newEntity.Order_Date = domain.Order_Date;
            newEntity.Check_In_Date = domain.Check_In_Date;
            newEntity.Check_Out_Date = domain.Check_Out_Date;
            if(domain.OrderItems != null)
            {
                newEntity.OrderItems = orderItemMapper.ToEntities(domain.OrderItems).ToList();
            }
            return newEntity;
        }
    }
}
