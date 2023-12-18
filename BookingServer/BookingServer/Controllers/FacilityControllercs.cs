using Domain.FacilityDomains;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacilityController:ControllerBase
    {
        private IFacilityServices facilityServices;
        public FacilityController( IFacilityServices facilityServices)
        {
            this.facilityServices = facilityServices;
        }
        [HttpGet]
        [Route("all")]
        public IActionResult All()
        { 
            var result = facilityServices.GetAll();
            return Ok(result);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id) 
        {
            var result = facilityServices.GetById(id);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Add(FacilityDomain facility)
        {
            var result = facilityServices.AddFacility(facility);
            if(result == null)
            {
                return BadRequest("Add failed");
            }    
            return Ok(result);
        }
        [HttpPut]
        public IActionResult Update(FacilityDomain facility) 
        {
            var result =facilityServices.UpdateFacility(facility);
            if(result == null)
            {
                return BadRequest("Update failed");
            }
            return Ok(result);
        }
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id) 
        {
            var result = facilityServices.DeleteFacility(id);
            if(result == false)
            {
                return BadRequest("Delete failed");
            }    
            return Ok(result);
        
        }
    }
}
