using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.OrderItemDomains
{
    public interface IOrderItemRepository
    {
        public IEnumerable<OrderItemDomain> GetAll();
        public OrderItemDomain Add(OrderItemDomain item);
        public OrderItemDomain Update(OrderItemDomain item);
        public bool Delete(int id);
    }
}
