using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.NeighborhoodDomains
{
    public interface INeighborhoodRepository
    {
        public IEnumerable<NeighborhoodDomain> GetAll();
        public NeighborhoodDomain GetById(int id);
        public NeighborhoodDomain Add(NeighborhoodDomain neighborhood);
        public NeighborhoodDomain Update(NeighborhoodDomain neighborhood);
        public bool Delete(int id);
    }
}
