using Domain.RoomFacilityDomains;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomFacilityController:ControllerBase
    {
        private IRoomFacilityServices roomFacilityServices;
        public RoomFacilityController(IRoomFacilityServices roomFacilityServices)
        {
            this.roomFacilityServices = roomFacilityServices;
        }
        [HttpGet]
        [Route("all")]
        public IActionResult GetAll() {
            var result = roomFacilityServices.GetAll();
            return Ok(result) ;
        }
        [HttpPost]
        public IActionResult Add(RoomFacilityDomain roomFacilityDomain)
        {
            var result = roomFacilityServices.Add(roomFacilityDomain);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Add failed");
        }
        [HttpPut]
        public IActionResult Update(RoomFacilityDomain roomFacilityDomain)
        {
            var result = roomFacilityServices.Update(roomFacilityDomain); 
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Update failed");
        }
        [HttpDelete]
        public IActionResult Delete(int roomId,int facilityId) {
            var result = roomFacilityServices.Delete(roomId, facilityId);
            if (result == true)
            {
                return Ok(result);
            }
            else return BadRequest("Delete failed");
        }

    }
}
