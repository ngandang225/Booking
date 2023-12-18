using Domain.OrderDomains;
using Domain.PropertyDomains;
using Domain.RoomDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IOrderServices
    {
        public IEnumerable<OrderDomain> GetAll();
        public IEnumerable<OrderDomain> GetAllByUserId(int userId);
        public OrderDomain GetById(int id);
        public OrderDomain Add(OrderDomain orderDomain);
        public OrderDomain Update(OrderDomain orderDomain);
        public bool Delete(int id);
    }
    public class OrderServices : IOrderServices
    {
        private IOrderRepository orderRepository;
        private IRoomRepository roomRepository;
        public OrderServices(IOrderRepository orderRepository,IRoomRepository roomRepository)
        {
            this.orderRepository = orderRepository;
            this.roomRepository = roomRepository;
        }
        public OrderDomain Add(OrderDomain orderDomain)
        {
            if (orderDomain.OrderItems.Count > 0)
            {
                foreach(var item in orderDomain.OrderItems)
                {
                    if(roomRepository.IsAvailable(item.Room_Id.Value,orderDomain.Check_In_Date.Value,orderDomain.Check_Out_Date.Value)==false)
                    {
                        throw new Exception("Room "+item.Room_Id.Value+" is not available now");
                    }
                }
            }
            try
            {
                var result = orderRepository.Add(orderDomain);
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }

        public bool Delete(int id)
        {
            var result = orderRepository.Delete(id);
            return result;
        }

        public IEnumerable<OrderDomain> GetAll()
        {
            var result = orderRepository.GetAll();
            return result;
        }

        public OrderDomain GetById(int id)
        {
            var result = orderRepository.GetById(id);
            return result;
        }

        public OrderDomain Update(OrderDomain orderDomain)
        {
            var result = orderRepository.Update(orderDomain);
            return result;
        }

        public IEnumerable<OrderDomain> GetAllByUserId(int userId)
        {
            return orderRepository.GetAllByUserId(userId);
        }
    }
}
