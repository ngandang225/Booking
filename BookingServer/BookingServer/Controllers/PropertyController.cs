using Domain.PropertyDomains;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyController : ControllerBase
    {
        private IPropertyServices propertyServices;
        public PropertyController(IPropertyServices propertyServices)
        {
            this.propertyServices = propertyServices;
        }
        [HttpGet]
        public IActionResult GetProperties([FromQuery] PropertySearch search, [FromQuery] PropertyFilter filter, [FromQuery] PropertySort sort, [FromQuery] PropertyPagination pagination)
        {
            var result = propertyServices.GetProperties(search, filter, sort, pagination);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Add(PropertyDomain property)
        {
            try
            {
                var result = propertyServices.AddProperty(property);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest("Add failed");
            }
            catch(Exception ex)
            {
                return Ok(ex.Message);
            }
        }
        [HttpPut]
        public IActionResult Update(PropertyDomain property)
        {
            var result = propertyServices.UpdateProperty(property);
            if (result != null) { return Ok(result); }
            return BadRequest("Property does not exists");
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var result = (propertyServices.DeleteProperty(id));
            if (result == true) { return Ok("Deleted"); }
            return BadRequest("Property does not exists");
        }
        [HttpDelete]
        [Route("{id}")]
        public IActionResult SoftDelete(int id)
        {
            var result = (propertyServices.SoftDeleteProperty(id));
            if (result == true) { return Ok("Deleted"); }
            return BadRequest("Property does not exists");
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id,[FromQuery] PropertySearch? propertySearch,bool? withAvailableRoom)
        {
            if(withAvailableRoom == true)
            {
                return Ok(propertyServices.GetById(id, propertySearch));
            }
            else
            {
                return Ok(propertyServices.GetById(id, null));
            }
        }
        [HttpGet]
        [Route("user/{userId}")]
        public IActionResult GetAllByUserId(int userId)
        {
            return Ok(propertyServices.GetAllByUserId(userId));
        }
    }
}
