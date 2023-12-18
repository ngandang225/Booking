using Domain.RoomDomains;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController:ControllerBase
    {
        private IRoomServices roomServices;
        public RoomController(IRoomServices roomServices)
        {
            this.roomServices = roomServices;
        }
        [HttpGet]
        [Route("property/{propertyId}")]
        public IActionResult GetAll(int propertyId)
        {
            var result = roomServices.GetAllByPropertyId(propertyId);
            return Ok(result);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id) { 
            var result = roomServices.GetById(id);
            return Ok(result);
        }
        [HttpPost] 
        public IActionResult Add(RoomDomain domain)
        {
            var result = roomServices.AddRoom(domain);
            if(result != null)
            {
                return Ok(result);
            }
            else return BadRequest("Add failed");
        }
        [HttpPut]
        public IActionResult Update(RoomDomain domain)
        {
            var result = roomServices.UpdateRoom(domain);
            if (result != null)
            {
                return Ok(result);
            }
            else return BadRequest("Update failed");
        }
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            var result =roomServices.DeleteRoom(id);
            if(result == true)
            {
                return Ok("Delete Successfully");
            }
            return BadRequest("Delete failed");
        }
    }
}
