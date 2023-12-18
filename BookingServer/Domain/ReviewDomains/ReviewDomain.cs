using Domain.RoomDomains;
using Domain.UserDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ReviewDomains
{
    public class ReviewDomain
    {
        public int Id { get; set; }
        public string? Content { get; set; }
        public int? User_Id { get; set; }
        public int? Score { get; set; }
        public DateTime? CreatedAt { get; set; }
        public UserDomain? User { get; set; }
        public RoomDomain? Room { get; set; }
        public int? Room_Id { get; set; }
        public void Update(ReviewDomain review)
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
