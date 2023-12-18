using Domain.RoomTypeDomains;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomTypeController: ControllerBase
    {
        private IRoomTypeServices roomTypeServices;
        public RoomTypeController(IRoomTypeServices roomTypeServices)
        {
            this.roomTypeServices = roomTypeServices;
        }
        [HttpGet]
        [Route("all")]
        public IActionResult All()
        {
            var result = roomTypeServices.GetAll();
            return Ok(result);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id) {
            var result = roomTypeServices.GetById(id);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Add(RoomTypeDomain roomType) {
            var result = roomTypeServices.AddRoomType(roomType);
            if(result == null)
            {
                return BadRequest("Add failed");
            }
            return Ok(result);
        }
        [HttpPut]
        public IActionResult Update(RoomTypeDomain roomType) {
            var result = roomTypeServices.UpdateRoomType(roomType);
            if (result == null)
            {
                return BadRequest("Update failed");
            }
            return Ok(result);
        }
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById(int id) {
            var result = roomTypeServices.Delete(id);
            if(result == false)
            {
                return BadRequest("Delete failed");
            }    
            return Ok(result);
        }
    }
}
