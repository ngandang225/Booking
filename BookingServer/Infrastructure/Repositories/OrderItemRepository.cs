using Domain.OrderDomains;
using Domain.OrderItemDomains;
using Infrastructure.EntityModels.OrderItemModel;
using Infrastructure.Mapping.OrderItemMappers;
using Infrastructure.Mapping.OrderMappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private CoreContext coreContext;
        private IOrderItemMapper orderItemMapper;
        private IOrderMapper orderMapper;
        public OrderItemRepository(CoreContext coreContext,IOrderMapper orderMapper,IOrderItemMapper orderItemMapper)
        {
            this.coreContext = coreContext;
            this.orderMapper = orderMapper;
            this.orderItemMapper = orderItemMapper;
        }

        public OrderItemDomain Add(OrderItemDomain item)
        {
            var oiDoc = coreContext.OrderItems.FirstOrDefault(oi => oi.Id == item.Id);
            if (oiDoc == null)
            {
                var entity = orderItemMapper.ToEntity(item);
                coreContext.OrderItems.Add(entity);
                coreContext.SaveChanges();
                return orderItemMapper.ToDomain(entity);
            }
            else
            { return null; }
        }

        public bool Delete(int id)
        {
            var oiDoc = coreContext.OrderItems.FirstOrDefault(oi => oi.Id == id);
            if (oiDoc == null)
            {
                return false;
            }
            else
            {
                coreContext.OrderItems.Remove(oiDoc);
                coreContext.SaveChanges();
                return true;
            }
        }

        public IEnumerable<OrderItemDomain> GetAll()
        {
            var entities = coreContext.OrderItems;
            return orderItemMapper.ToDomains(entities);
        }

        public OrderItemDomain Update(OrderItemDomain item)
        {
            var oiDoc = coreContext.OrderItems.FirstOrDefault(oi => oi.Id == item.Id);
            if (oiDoc == null)
            { return null; }
            else
            {
                var entity = orderItemMapper.ToEntity(item);
                oiDoc.Update(entity);
                coreContext.SaveChanges();
                return orderItemMapper.ToDomain(oiDoc);
            }
        }
    }
}
