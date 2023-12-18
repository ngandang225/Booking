using Domain.PropertyTypeDomains;
using Infrastructure.Mapping.PropertyTypeMappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class PropertyTypeRepository : IPropertyTypeRepository
    {
        private CoreContext _coreContext;
        private IPropertyTypeMapper _mapper;
        public PropertyTypeRepository(CoreContext coreContext, IPropertyTypeMapper mapper)
        {
            _coreContext = coreContext;
            _mapper = mapper;
        }
        public PropertyTypeDomain Add(PropertyTypeDomain propertyType)
        {
            var newEntity = _mapper.ToEntity(propertyType);
            _coreContext.PropertyTypes.Add(newEntity);
            _coreContext.SaveChanges();
            return _mapper.ToDomain(newEntity);
        }

        public bool Delete(int id)
        {
            var ptDoc = _coreContext.PropertyTypes.FirstOrDefault(pt => pt.Id == id);
            if (ptDoc != null)
            {
                _coreContext.PropertyTypes.Remove(ptDoc);
                _coreContext.SaveChanges();
                return true;
            }
            else { return false; }
        }

        public IEnumerable<PropertyTypeDomain> GetAll()
        {
            var entities = _coreContext.PropertyTypes.ToList();
            return _mapper.ToDomains(entities);
        }

        public PropertyTypeDomain GetPropertyTypeById(int id)
        {
            var entity = _coreContext.PropertyTypes.Where(pt => pt.Id == id).FirstOrDefault();
            if (entity == null)
            {
                return null;
            }
            return _mapper.ToDomain(entity);
        }

        public PropertyTypeDomain Update(PropertyTypeDomain propertyType)
        {
            var ptDoc = _coreContext.PropertyTypes.FirstOrDefault(pt => pt.Id == propertyType.Id);
            if (ptDoc != null)
            {
                var updateEntity = _mapper.ToEntity(propertyType);
                ptDoc.Update(updateEntity);
                _coreContext.SaveChanges();
                return _mapper.ToDomain(ptDoc);
            }
            else { return null; }
        }
    }
}
