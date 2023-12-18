using Infrastructure.EntityModels.OrderItemModel;
using Infrastructure.EntityModels.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.OrderModel
{
    public class Order
    {
        public int Id { get; set; }
        public int? User_Id { get; set; }
        public string? Status { get; set; }
        public string? Customer_Name { get; set; }
        public string? Email { get; set; }
        public DateTime? Order_Date { get; set; }
        public DateTime? Check_In_Date { get; set; }
        public DateTime? Check_Out_Date { get; set; }
        public User User { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public void Update(Order order)
        {
            foreach (var item in order.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(order) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(order));
            }
        }
    }
}
