using Infrastructure.EntityModels.PropertyModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.VoucherModel
{
    public class Voucher
    {
        public int Id { get; set; }
        public int? Scope { get; set; }
        public string? Name { get; set; }
        public int? Percentage { get; set; }
        public DateTime? Open_Date { get; set; }
        public DateTime? Close_Date { get; set; }
        public Property Property { get; set; }
    }
}
