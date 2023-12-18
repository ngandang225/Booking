using Domain.GeographycalPlaceDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IGeographycalPlaceServices
    {
        public IEnumerable<GeographycalPlaceDomain> GetAll();
        public GeographycalPlaceDomain Get(int id);
        public GeographycalPlaceDomain Add(GeographycalPlaceDomain geographycalPlace);
        public GeographycalPlaceDomain Update(GeographycalPlaceDomain geographycalPlace);
        public void Delete(int id);
    }
    public class GeographycalPlaceServices : IGeographycalPlaceServices
    {
        private readonly IGeographycalPlaceRepository geographycalRepository;
        public GeographycalPlaceServices(IGeographycalPlaceRepository geographycalRepository)
        {
            this.geographycalRepository = geographycalRepository;
        }
        public GeographycalPlaceDomain Add(GeographycalPlaceDomain geographycalPlace)
        {
            return geographycalRepository.Add(geographycalPlace);
        }

        public void Delete(int id)
        {
            geographycalRepository.Delete(id);
        }

        public GeographycalPlaceDomain Get(int id)
        {
            return geographycalRepository.GetById(id);
        }

        public IEnumerable<GeographycalPlaceDomain> GetAll()
        {
            return geographycalRepository.GetAll();
        }

        public GeographycalPlaceDomain Update(GeographycalPlaceDomain geographycalPlace)
        {
            var result = geographycalRepository.Update(geographycalPlace);
            return result;
        }
    }
}
