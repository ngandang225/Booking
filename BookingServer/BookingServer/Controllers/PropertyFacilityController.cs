using Domain.PropertyFacilityDomains;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyFacilityController: ControllerBase
    {
        private IPropertyFacilityServices propertyFacilityServices;
        public PropertyFacilityController(IPropertyFacilityServices propertyFacilityServices)
        {
            this.propertyFacilityServices = propertyFacilityServices;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var result = propertyFacilityServices.GetAll();
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Add(PropertyFacilityDomain propertyFacilityDomain) {
            var result = propertyFacilityServices.Add(propertyFacilityDomain);
            if(result != null)
            {
                return Ok(result);
            }    
            else
            {
                return BadRequest("Add Failed");
            }    
        }
        [HttpPut]
        public IActionResult Update(PropertyFacilityDomain propertyFacilityDomain)
        {
            var result = propertyFacilityServices.Update(propertyFacilityDomain);
            if(result != null )
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("Update failed");
            }    
        }
        [HttpDelete]
        public IActionResult Delete(int propertyId,int facilityId) 
        {
            var result = propertyFacilityServices.Delete(propertyId, facilityId);
            if(result == true)
            {
                return(Ok(result));
            }
            return BadRequest("delete fail");
        }
    }
}
