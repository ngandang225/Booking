using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.OrderDomains
{
    public interface IOrderRepository
    {
        public IEnumerable<OrderDomain> GetAll();
        public IEnumerable<OrderDomain> GetAllByUserId(int userId);
        public OrderDomain GetById(int id);
        public OrderDomain Add(OrderDomain orderDomain);
        public OrderDomain Update(OrderDomain orderDomain);
        public bool Delete(int id);
    }
}
