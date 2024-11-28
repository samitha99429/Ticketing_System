import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ticketbooking.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from "axios";
import VueSweetalert2 from "sweetalert2";

const TicketBooking = () => {
  // Define and initialize state variables
  const [id, setReservationIds] = useState(""); // State variable for the reservation ID
  const [referenceID, setReferenceID] = useState(''); // State variable for the reference ID
  const [time, setSelectedTime] = useState(''); // State variable for the selected time
  const [reservationDate, setReservationDate] = useState(''); // State variable for the reservation date
  const [maxReservationDate, setMaxReservationDate] = useState(''); // State variable for the maximum allowed reservation date
  const [bookingDates, setBookingDate] = useState(''); // State variable for booking date (initially unused)
  const [numberOfTickets, setNumberOfTickets] = useState(0); // State variable for the number of tickets
  const [departureLocation, setDepartureLocation] = useState(''); // State variable for departure location
  const [destination, setDestination] = useState(''); // State variable for the destination
  const [formErrors, setFormErrors] = useState({}); // State variable for form validation errors
  const [userSearch, setUserSearch] = useState(''); // State variable for user search
  const [listOfReservations, setListOfReservations] = useState([]); // State variable for a list of reservations

  // Get the current date and format it
  const bookingDate = new Date();
  const dates = `${bookingDate.getDate()}/${bookingDate.getMonth() + 1}/${bookingDate.getFullYear()}`;

  // Handle date change in the reservation date picker
  const handleDateChange = (date) => {
    const currentDate = new Date();
    const maxAllowedDate = new Date(currentDate);
    maxAllowedDate.setDate(currentDate.getDate() + 30); // Adding 30 days to the current date
    setMaxReservationDate(maxAllowedDate);

    if (date > maxAllowedDate) {
      setFormErrors({ reservationDate: 'Reservation date must be within 30 days from today' });
    } else {
      setFormErrors({ reservationDate: '' });
    }

    setReservationDate(date);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    createReservation();
  };

  // Create a new reservation
  const createReservation = () => {
    // Send a POST request to create a reservation
    Axios.post("https://localhost:44304/api/TicketReservation", {
      referenceID,
      time,
      reservationDate,
      bookingDate,
      numberOfTickets,
      departureLocation,
      destination
    })
      .then((response) => {
        if (response.status === 200) {
          // Check if the reservation was successful and add it to the list
          setListOfReservations([
            ...listOfReservations,
            {
              referenceID,
              time,
              bookingDate,
              reservationDate,
              numberOfTickets,
              departureLocation,
              destination
            },
          ]);

          VueSweetalert2.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1000,
            icon: 'success',
            title: 'Reservation added to the System',
          }).then(function () {
            // Redirect the user
            window.location.href = "/backofficer/ticketbooking";
          });
        }
      })
      .catch((error) => {
        alert('Maximum limit of reservation'); // Handle any errors
        window.location.href = "/backofficer/ticketbooking";
      });
  };

  // Load reservations from the API using useEffect
  useEffect(() => {
    Axios.get("https://localhost:44304/api/TicketReservation").then((response) => {
      setListOfReservations(response.data);
    });
  }, []);

  // Load reservation details for editing
  const loadPackageDetailsEdit = (TicketReservation) => {
    // Disable certain buttons and set details for editing
    document.getElementById("reg").setAttribute("disabled", "true");
    document.getElementById("delete").setAttribute("disabled", "true");
    setReservationIds(TicketReservation.id);
    setReferenceID(TicketReservation.referenceID);
    const dates = new Date(TicketReservation.reservationDate);
    dates.setDate(dates.getDate() - 1);
    setReservationDate(dates);
    const times = new Date(TicketReservation.time);
    setSelectedTime(times);
    setDepartureLocation(TicketReservation.departureLocation);
    setDestination(TicketReservation.destination);
    setNumberOfTickets(TicketReservation.numberOfTickets);
  };

  // Load reservation details for deletion
  const loadPackageDetailsDelete = (TicketReservation) => {
    // Disable certain buttons and set details for deletion
    document.getElementById("reg").setAttribute("disabled", "true");
    document.getElementById("edit").setAttribute("disabled", "true");
    setReservationIds(TicketReservation.id);
    setReferenceID(TicketReservation.referenceID);
    const dates = new Date(TicketReservation.reservationDate);
    dates.setDate(dates.getDate() - 1);
    setReservationDate(dates);
    const times = new Date(TicketReservation.time);
    setSelectedTime(times);
    setDepartureLocation(TicketReservation.departureLocation);
    setDestination(TicketReservation.destination);
    setNumberOfTickets(TicketReservation.numberOfTickets);
  };

  // Update a reservation
  function updateReservation(e) {
    e.preventDefault();
    const newPackage = {
      id,
      referenceID,
      time,
      bookingDate,
      reservationDate,
      numberOfTickets,
      departureLocation,
      destination
    };

    Axios.put(`https://localhost:44304/api/TicketReservation/${id}`, newPackage)
      .then((response) => {
        // Check if the response is successful (status code 200)
        if (response.status === 200) {
          VueSweetalert2.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1800,
            icon: 'success',
            title: response.data.message, // Assuming the response has a "message" property
          }).then(function () {
            // Redirect the user
            window.location.href = "/backofficer/ticketbooking";
          });
        }
      })
      .catch((err) => {
        alert("You can't update at least 5 days before the reservation date");
        window.location.href = "/backofficer/ticketbooking";
      });
  };

  // Delete a reservation
  const deleteReservation = () => {
    Axios.delete(`https://localhost:44304/api/TicketReservation/${id}`)
      .then((response) => {
        if (response.status === 200) {
          VueSweetalert2.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1800,
            icon: 'success',
            title: response.data, // Assuming the response contains the success message
          }).then(function () {
            // Redirect the user
            window.location.href = "/backofficer/ticketbooking";
          });
        }
      })
      .catch((err) => {
        alert("You can't delete at least 5 days before the reservation date");
        window.location.href = "/backofficer/ticketbooking";
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="main_container" style={{ width: '70%', height: '500px' }}>
          <div className="item fw-bold fs-5">Ticket Booking Management</div>
          <div className="item">
            <div className="row mt-2 ps-3">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="row">
                    <div className="d-flex justify-content-start align-items-center"></div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="row"></div>
                </div>
              </div>
            </div>
            <div className="row mt-5 px-3">
              <form>
                <div className="row mt-4">
                  <div className="col-5">
                    <input
                      type="text"
                      value={referenceID}
                      className="form-control"
                      placeholder="Reference ID"
                      onChange={(e) => {
                        setReferenceID(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-5">
                    <input
                      name="Dateposted"
                      className="form-control"
                      placeholder="Reservation Date"
                      type="text"
                      value={dates}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-5">
                    <DatePicker
                      selected={reservationDate}
                      type="date"
                      onChange={handleDateChange}
                      value={reservationDate}
                      minDate={new Date()} // Prevent choosing past dates
                      className="form-control"
                      placeholderText="Reservation Date"
                    />
                    <p className="alert-txt">{formErrors.reservationDate}</p>
                  </div>
                  <div className="col">
                    <DatePicker
                      id="timepicker-placeholder"
                      placeholderText="Choose a time"
                      selected={time}
                      onChange={(date) => setSelectedTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      value={time}
                    />
                  </div>
                  <div className="col"></div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <input
                      type="text"
                      value={departureLocation}
                      className="form-control"
                      placeholder="From"
                      onChange={(e) => {
                        setDepartureLocation(e.target.value);
                      }}
                    />
                    <p className="alert-txt">{formErrors.Location}</p>
                  </div>
                  <div className="col">
                    <div className="col">
                      <input
                        type="text"
                        value={destination}
                        className="form-control"
                        placeholder="To"
                        onChange={(e) => {
                          setDestination(e.target.value);
                        }}
                      />
                      <p className="alert-txt">{formErrors.Location}</p>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-4">
                    <input
                      type="number"
                      id="passengerCount"
                      name="passengerCount"
                      placeholder="Number of passengers"
                      min="1"
                      max="100"
                      value={numberOfTickets}
                      step="1"
                      style={{ width: '200px' }}
                      onChange={(e) => {
                        setNumberOfTickets(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="d-flex justify-content-around align-items-center">
                    <button
                      type="submit"
                      className="btn btn-primary btnRegister"
                      onClick={handleSubmit}
                      id="reg"
                    >
                      Book
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btnUpdate"
                      id="edit"
                      onClick={updateReservation}
                    >
                      Update
                    </button>
                    <button type="button" className="btn btn-danger btnDelete" id="delete" onClick={deleteReservation}>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="row mt-5 px-3">
              <h6 className="mb-0 fw-bold mt-2 mb-2 fs-5">Current Reservations</h6>
              <div className="row mb-5">
                <div className="d-flex justify-content-end align-items-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <input
                      id="searchID"
                      type="text"
                      className="form-control col-8 me-5 px-5"
                      placeholder="Reference ID"
                      onChange={(e) => {
                        setUserSearch(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="button"
                      className="form-control btnSearch text-white"
                      value="Search"
                    />
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped custom-table" id="assignLabsTable">
                  <thead>
                    <tr>
                      <th scope="col">Reservation ID</th>
                      <th scope="col">Reference ID</th>
                      <th scope="col">Booking Date</th>
                      <th scope="col">Reservation Date</th>
                      <th scope="col">Passengers</th>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                      <th scope="col">Action</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {listOfReservations &&
                      listOfReservations
                        .filter((value) => {
                          if (userSearch === "") {
                            return value;
                          } else if (
                            value.referenceID
                              .toLowerCase()
                              .includes(userSearch.toLowerCase())
                          ) {
                            return value;
                          }
                        })
                        .map((TicketReservation, i) => (
                          <tr class="crs-tr" data-status="active">
                            <td className="crs-td">{TicketReservation.id}</td>
                            <td className="crs-td">{TicketReservation.referenceID}</td>
                            <td className="crs-td">
                              {TicketReservation.bookingDate}
                            </td>
                            <td className="crs-td">
                              {TicketReservation.reservationDate}
                            </td>
                            <td className="crs-td">{TicketReservation.numberOfTickets}</td>
                            <td className="crs-td">{TicketReservation.departureLocation}</td>
                            <td className="crs-td">{TicketReservation.destination}</td>
                            <td>
                              <i
                                className="fa-solid fa-pen me-3 text-primary d-inline fa-2x"
                                onClick={() => {
                                  loadPackageDetailsEdit(TicketReservation);
                                }}
                              />
                              <i
                                className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline fa-2x"
                                onClick={() => {
                                  loadPackageDetailsDelete(TicketReservation);
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketBooking;
