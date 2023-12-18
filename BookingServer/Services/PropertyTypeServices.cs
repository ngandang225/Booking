using Domain.PropertyTypeDomains;
using Infrastructure.EntityModels.PropertyTypeModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IPropertyTypeService
    {
        public PropertyTypeDomain GetPropertyTypeById(int id);
        public IEnumerable<PropertyTypeDomain> GetAll();
        public PropertyTypeDomain Add(PropertyTypeDomain propertyType);
        public PropertyTypeDomain Update(PropertyTypeDomain propertyType);
        public bool Delete(int id);
    }
    public class PropertyTypeServices : IPropertyTypeService
    {
        private IPropertyTypeRepository _typeRepository;
        public PropertyTypeServices(IPropertyTypeRepository typeRepository)
        {
            _typeRepository = typeRepository;
        }
        public PropertyTypeDomain Add(PropertyTypeDomain propertyType)
        {
            return _typeRepository.Add(propertyType);

        }

        public bool Delete(int id)
        {
            return _typeRepository.Delete(id);

        }

        public IEnumerable<PropertyTypeDomain> GetAll()
        {
            return _typeRepository.GetAll();

        }

        public PropertyTypeDomain GetPropertyTypeById(int id)
        {
            return _typeRepository.GetPropertyTypeById(id);

        }

        public PropertyTypeDomain Update(PropertyTypeDomain propertyType)
        {
            return _typeRepository.Update(propertyType);
        }
    }
}
