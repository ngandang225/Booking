using Domain.PropertyTypeDomains;
using Infrastructure.EntityModels.PropertyTypeModel;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyTypeController : ControllerBase
    {
        private readonly IPropertyTypeService _typeService;
        public PropertyTypeController(IPropertyTypeService typeService)
        {
            _typeService = typeService;
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetPropertyById(int id)
        {
            var result = _typeService.GetPropertyTypeById(id);
            return Ok(result);
        }
        [HttpGet]
        [Route("all")]
        public IActionResult GetAll()
        {
            var result = _typeService.GetAll();
            return Ok(result);
        }
        [HttpPost]
        public IActionResult AddPropertyType(PropertyTypeDomain propertyType)
        {
            var result = _typeService.Add(propertyType);
            return Ok(result);
        }
        [HttpPut]
        public IActionResult UpdatePropertyType(PropertyTypeDomain propertyType)
        {
            var result = _typeService.Update(propertyType);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("This property type does not exist");
        }
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeletePropertyType(int id)
        {
            var result = _typeService.Delete(id);
            if (result == true)
            {
                return Ok("Deleted");
            }
            return BadRequest("This property type does not exist");
        }
    }
}
