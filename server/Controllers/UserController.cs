using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Ticket_Reservation_System_Server.Models;
using Ticket_Reservation_System_Server.Services;

namespace Ticket_Reservation_System_Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public UserController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var user = await _userService.AuthenticateAsync(request.username, request.password);
                Console.WriteLine(request.username);

                if (user == null)
                {
                    return Unauthorized(new { message = "Invalid credentials" });
                }

                var token = GenerateJwtToken(user);
                var roles = user.Roles;

                return Ok(new { token , roles });
            }
            catch (Exception ex)
            {
                // Handle exceptions here, such as authentication errors or database errors
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var existingUser = await _userService.GetUserByUsernameAsync(request.Username);

                if (existingUser != null)
                {
                    return BadRequest(new { message = "Username already exists" });
                }

                var user = new User
                {
                    UserName = request.Username,
                    Roles = request.UserRole,
                    Password=request.Password
                };

                await _userService.RegisterAsync(user, request.Password);

                return Ok(new { message = "User registered successfully" });
            }
            catch (Exception ex)
            {
                // Handle exceptions here, such as registration errors or database errors
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
        [HttpGet("userrole")]
        public IActionResult GetUserRole()
        {
            try
            {
                // The [Authorize] attribute should ensure that a valid user principal is available.
                // You can directly access the claims from the User property.
                var userRoleClaim = User.FindFirst(ClaimTypes.Role);

                if (userRoleClaim != null)
                {
                    var userRole = userRoleClaim.Value;

                    return Ok(new { userRole });
                }
                else
                {
                    // If there's no role claim in the user's identity, you can return an appropriate response.
                    return NotFound(new { message = "Role claim not found in the token" });
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions here, such as authorization errors
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.Roles),



        };

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
