using Domain.OrderDomains;
using Domain.RoomDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.OrderItemDomains
{
    public class OrderItemDomain
    {
        public int Id { get; set; }
        public int? Room_Id { get; set; }
        public int? Order_Id { get; set; }
        public int? User_Id { get; set; }
        public double? Price { get; set; }
        public OrderDomain? Order { get; set; }
        public RoomDomain? Room { get; set; }
    }
}
