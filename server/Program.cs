using Microsoft.AspNetCore.Authentication.JwtBearer;
using Ticket_Reservation_System_Server.Models;
using Microsoft.IdentityModel.Tokens;
using Ticket_Reservation_System_Server.Services;
using System.Text;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.Configure<DbConfiguration>(
     builder.Configuration.GetSection("MongoDB")
    );

//resolving the CategoryService dependency here
builder.Services.AddTransient<ITravelerService, TravelerService>();

//resolving the TicketReservationService dependency here
builder.Services.AddTransient< ITicketReservationService,TicketReservationService>();

//resolving the TrainScheduleService dependency here
builder.Services.AddTransient<ITrainScheduleService,TrainScheduleService>();

//resolving the User dependency here

builder.Services.AddTransient<IUserService, UserService>();

builder.Services.AddCors(p => p.AddPolicy("cors", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));



var app = builder.Build();
app.UseCors("cors");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


