using Domain.NeighborhoodDomains;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NeighborhoodController: ControllerBase
    {
        private INeighborhoodServices neighborhoodServices;
        public NeighborhoodController(INeighborhoodServices neighborhoodServices)
        {
            this.neighborhoodServices = neighborhoodServices;
        }
        [HttpGet]
        [Route("all")]
        public IActionResult All() 
        {
            var result = neighborhoodServices.GetAll();
            return Ok(result);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id) 
        {
            return Ok(neighborhoodServices.GetById(id));
        }
        [HttpPost]
        public IActionResult Add(NeighborhoodDomain neighborhoodDomain)
        {
            var result = neighborhoodServices.Add(neighborhoodDomain);
            if(result == null)
            {
                return BadRequest("Add failed");
            }    
            return Ok(result);
        }
        [HttpPut]
        public IActionResult Update(NeighborhoodDomain neighborhoodDomain) 
        {
            var result = neighborhoodServices.Update(neighborhoodDomain);
            if(result == null)
            {
                return BadRequest("Update failed");
            }
            return Ok(result);
        }
        [HttpDelete]
        public IActionResult DeleteById(int id) 
        {
            var result = neighborhoodServices.Delete(id);
            if(result == false)
            {
                return BadRequest("Delete failed");
            }    
            return Ok(result);
        }
    }
}
