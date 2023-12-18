using Infrastructure.EntityModels.OrderModel;
using Infrastructure.EntityModels.RoomModel;
using Infrastructure.EntityModels.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.OrderItemModel
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int Room_Id { get; set; }
        public int? Order_Id { get; set; }
        public int? User_Id { get; set; }
        public double? Price { get; set; }
        public Order? Order;
        public Room? Room { get; set; }
        public void Update(OrderItem orderItem)
        {
            foreach (var item in orderItem.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(orderItem) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(orderItem));
            }
        }
    }
}
