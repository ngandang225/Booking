using Domain.OrderDomains;
using Domain.RoomDomains;
using Domain.PropertyDomains;
using Infrastructure.Mapping.OrderItemMappers;
using Infrastructure.Mapping.OrderMappers;
using Infrastructure.Mapping.PropertyMappers;
using Infrastructure.Mapping.RoomMappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private CoreContext coreContext;
        private IOrderMapper orderMapper;
        private IOrderItemMapper orderItemMapper;
        private IRoomMapper roomMapper;
        private IPropertyMapper propertyMapper;
        public OrderRepository(CoreContext coreContext,IOrderMapper orderMapper,IOrderItemMapper orderItemMapper, IRoomMapper roomMapper, IPropertyMapper propertyMapper) {
            this.coreContext = coreContext;
            this.orderMapper = orderMapper;
            this.orderItemMapper = orderItemMapper;
            this.roomMapper = roomMapper;
            this.propertyMapper = propertyMapper;
        }
        public OrderDomain Add(OrderDomain orderDomain)
        {
            var orderDoc = coreContext.Orders.FirstOrDefault(o => o.Id == orderDomain.Id);
            var orderItems = orderItemMapper.ToEntities(orderDomain.OrderItems);
            var roomDocs = coreContext.Rooms.AsEnumerable().Where(r => orderItems.Any(oi => oi.Room_Id == r.Id));
            //coreContext.Rooms.ExecuteUpdate(r => r.SetProperty(p => p.TrackVersion, p => DateTime.Now));
            foreach(var roomDoc in roomDocs)
            {
                roomDoc.TrackVersion = DateTime.Now;
            }
            if (orderDoc == null)
            {
                var entity = orderMapper.ToEntity(orderDomain);
                coreContext.Orders.Add(entity);
                try
                {
                    coreContext.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    throw new Exception("There are any rooms is not available");
                }
                return orderMapper.ToDomain(entity);
            }
            else
            {
                return null;
            }
        }

        public bool Delete(int id)
        {
            var orderDoc = coreContext.Orders.FirstOrDefault(o => o.Id == id);
            if(orderDoc == null) { return false; }
            else
            {
                coreContext.Orders.Remove(orderDoc);
                coreContext.SaveChanges(true);
                return true;
            }
        }

        public IEnumerable<OrderDomain> GetAll()
        {
            var entities = coreContext.Orders.Include(o => o.OrderItems);
            return orderMapper.ToDomains(entities);
        }

        public OrderDomain GetById(int id)
        {
            var entity = coreContext.Orders.FirstOrDefault(o => o.Id == id);
            if (entity != null) { 
                return orderMapper.ToDomain(entity);
            }
            return null;
        }

        public OrderDomain Update(OrderDomain orderDomain)
        {
            var orderDoc = coreContext.Orders.FirstOrDefault(o => o.Id == orderDomain.Id);
            if(orderDoc != null)
            {
                var entity = orderMapper.ToEntity(orderDomain);
                orderDoc.Update(entity);
                coreContext.SaveChanges();
                return orderMapper.ToDomain(orderDoc);
            }
            else
            {
                return null;
            }
        }

        public IEnumerable<OrderDomain> GetAllByUserId(int userId)
        {
            var entities = coreContext.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Room)
                        .ThenInclude(r => r.Property)
                .Where(o => o.User_Id == userId);
            var domains = new List<OrderDomain>();
            foreach (var entity in entities)
            {
                var domain = orderMapper.ToDomain(entity);
                for (var i = 0; i < entity.OrderItems.Count; i++)
                {
                    var roomEntity = entity.OrderItems.ToList()[i].Room;
                    RoomDomain roomDomain = this.roomMapper.ToDomain(roomEntity);
                    domain.OrderItems.ToList()[i].Room = roomDomain;

                    var propertyEntity = entity.OrderItems.ToList()[i].Room.Property;
                    PropertyDomain propertyDomain = this.propertyMapper.ToDomain(propertyEntity);
                    domain.OrderItems.ToList()[i].Room.Property = propertyDomain;
                }
                domains.Add(domain);
            }
            return domains;
        }
    }
}
