using Domain.OrderItemDomains;
using Domain.UserDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.OrderDomains
{
    public class OrderDomain
    {
        public int Id { get; set; }
        public int? User_Id { get; set; }
        public string? Status { get; set; }
        public string? Customer_Name { get; set; }
        public string? Email { get; set; }
        public DateTime? Order_Date { get; set; }
        public DateTime? Check_In_Date { get; set; }
        public DateTime? Check_Out_Date { get; set; }
        public UserDomain? User { get; set; }
        public List<OrderItemDomain>? OrderItems { get; set; }
    }
}
