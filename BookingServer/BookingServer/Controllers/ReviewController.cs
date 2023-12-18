using Domain.ReviewDomains;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController: ControllerBase
    {
        private IReviewServices reviewServices;
        public ReviewController(IReviewServices reviewServices)
        {
            this.reviewServices = reviewServices;
        }
        [HttpGet]
        [Route("{roomId}")]
        public IActionResult GetByRoomId(int roomId)
        {
            var result= reviewServices.GetByRoomId(roomId);
            return Ok(result);  
        }
        [HttpPost]
        public IActionResult Add(ReviewDomain reviewDomain)
        {
            var result = reviewServices.Add(reviewDomain);
            if(result == null) { return BadRequest("Add failed"); }
            return Ok(result);
        }
        [HttpDelete]
        public IActionResult Delete(int id) 
        {
            var result = reviewServices.Delete(id);
            if(result == false) { return BadRequest("Delet failed"); }
            return Ok(result);
        }
        [HttpPut]
        public IActionResult Update(ReviewDomain reviewDomain)
        {
            var result = reviewServices.Update(reviewDomain);
            if(result == null)
            {
                return BadRequest("Update failed");
            }
            return Ok(result);
        }
    }
}
