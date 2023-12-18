using Infrastructure.EntityModels.OrderModel;
using Infrastructure.EntityModels.PropertyModel;
using Infrastructure.EntityModels.ReviewModel;
using Infrastructure.EntityModels.RoleModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.UserModel
{
    public class User
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Fullname { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        public int? Role_id { get; set; }
        public ICollection<Property> AccessProperties { get; set; }
        public Role Role { get; set; }
        public ICollection<Property> Properties { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public void Update(User u)
        {
            foreach (var item in u.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                if (item.GetValue(u) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(u));
            }
        }
    }
}
