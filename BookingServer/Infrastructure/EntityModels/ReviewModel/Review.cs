using Infrastructure.EntityModels.RoomModel;
using Infrastructure.EntityModels.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.ReviewModel
{
    public class Review
    {
        public int Id { get; set; }
        public string? Content { get; set; }
        public int? User_Id { get; set; }
        public int? Score { get; set; }
        public User? User { get; set; }
        public Room? Room { get; set; }
        public int? Room_Id { get; set; }
        public DateTime? CreatedAt { get; set; }
        public void Update(Review review)
        {
            foreach (var item in review.GetType().GetProperties())
            {
                if (item.Name == "Id") continue;
                //if (item.PropertyType == typeof(int) && item.GetValue(group).ToString() == "0") continue;
                //if (item.PropertyType == typeof(double) && item.GetValue(group).ToString() == "0") continue;
                if (item.GetValue(review) == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(review));
            }
        }
    }
}
