using Infrastructure.EntityModels.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityModels.RoleModel
{
    public class Role
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
