using Infrastructure.EntityModels.RoomModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.PriceListModel
{
    public class PriceList
    {
        public int Id { get; set; }
        public int? Room_Id { get; set; }
        public double? Price { get; set; }
        public double? Value { get; set; }
        public DateTime? Open_Date { get; set; }
        public DateTime? Close_Date { get; set; }
        public string? Type { get; set; }
        public Room Room { get; set; }
    }
}
