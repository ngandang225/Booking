using Domain.NeighborhoodDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface INeighborhoodServices
    {
        public IEnumerable<NeighborhoodDomain> GetAll();
        public NeighborhoodDomain GetById(int id);
        public NeighborhoodDomain Add(NeighborhoodDomain neighborhood);
        public NeighborhoodDomain Update(NeighborhoodDomain neighborhood);
        public bool Delete(int id);
    }
    public class NeighborhoodServices : INeighborhoodServices
    {
        private readonly INeighborhoodRepository neighborhoodRepository;
        public NeighborhoodServices(INeighborhoodRepository neighborhoodRepository)
        {
            this.neighborhoodRepository = neighborhoodRepository;
        }

        public NeighborhoodDomain Add(NeighborhoodDomain neighborhood)
        {
            return neighborhoodRepository.Add(neighborhood);
        }

        public bool Delete(int id)
        {
            return neighborhoodRepository.Delete(id);

        }

        public IEnumerable<NeighborhoodDomain> GetAll()
        {
            return neighborhoodRepository.GetAll();

        }

        public NeighborhoodDomain GetById(int id)
        {
            return neighborhoodRepository.GetById(id);

        }

        public NeighborhoodDomain Update(NeighborhoodDomain neighborhood)
        {
            return neighborhoodRepository.Update(neighborhood);

        }
    }
}
