using Domain.OrderDomains;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController: ControllerBase
    {
        private IOrderServices orderServices;
        public OrderController(IOrderServices orderServices)
        {
            this.orderServices = orderServices;
        }
        [HttpGet]
        public IActionResult GetAll() { 
            var result = orderServices.GetAll();
            return Ok(result);
        }
        [HttpGet]
        [Route("user/{userId}")]
        public IActionResult GetAllByUserId(int userId)
        {
            var result = orderServices.GetAllByUserId(userId);
            return Ok(result);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id) 
        {
            var result = orderServices.GetById(id);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Add(OrderDomain order)
        {
            try
            {
                var result = orderServices.Add(order);
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest("Duplicated Order!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpPut]
        public IActionResult Update(OrderDomain order)
        {
            var result = orderServices.Update(order);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Order does not existed");
        }
    }
}
