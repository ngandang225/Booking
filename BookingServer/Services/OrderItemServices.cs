using Domain.OrderItemDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IOrderItemServices
    {
        public IEnumerable<OrderItemDomain> GetAll();
        public OrderItemDomain Add(OrderItemDomain item);
        public OrderItemDomain Update(OrderItemDomain item);
        public bool Delete(int id);
    }
    public class OrderItemServices : IOrderItemServices
    {
        private IOrderItemRepository orderItemRepository;
        public OrderItemServices(IOrderItemRepository orderItemRepository)
        {
            this.orderItemRepository = orderItemRepository;
        }
        public OrderItemDomain Add(OrderItemDomain item)
        {
            var result = orderItemRepository.Add(item);
            return result;
        }

        public bool Delete(int id)
        {
            var result = (orderItemRepository.Delete(id));
            return result;
        }

        public IEnumerable<OrderItemDomain> GetAll()
        {
            var result = orderItemRepository.GetAll();
            return result;
        }

        public OrderItemDomain Update(OrderItemDomain item)
        {
            var result = orderItemRepository.Update(item);
            return result;
        }
    }
}
