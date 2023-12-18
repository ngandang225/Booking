using Domain.UserDomains;
using BookingServer.DTO;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController:ControllerBase
    {
        private IUserServices userServices;
        public UserController(IUserServices userServices) {
            this.userServices = userServices;
        }
        [HttpGet]
        [Route("all")]
        public IActionResult All()
        {
            var result = userServices.GetAll();
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id)
        {
            var result = userServices.GetById(id);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Add(UserDomain user)
        {
            try
            {
                var result = userServices.Add(user);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest("Add failed");
            }
            catch (Exception ex)
            {
                // Handle the custom exception and return a specific error message
                return Ok(ex.Message);
            }


        }

        [HttpPut]
        public IActionResult Update(UserDomain user)
        {
            var result = userServices.Update(user);
            if (result == null)
            {
                return BadRequest("Update failed");
            }
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById(int id)
        {
            var result = userServices.Delete(id);
            if (result == false)
            {
                return BadRequest("Delete failed");
            }
            return Ok(result);
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(UserDomain user)
        {
            try
            {
                var result = userServices.Login(user);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest("Login failed");
            }
            catch (Exception ex)
            {
                // Handle the custom exception and return a specific error message
                return Ok(ex.Message);
            }
        }

        [HttpPut]
        [Route("ChangePassword")]
        public IActionResult ChangePassword(UserChangePasswordDTO userDTO)
        {
            var userDomain = new UserDomain();
            userDomain.Id = userDTO.Id;
            userDomain.Password = userDTO.CurrentPassword;
            try
            {
                var result = userServices.ChangePassword(userDomain, userDTO.NewPassword);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest("Change password failed");
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }
    }
}
