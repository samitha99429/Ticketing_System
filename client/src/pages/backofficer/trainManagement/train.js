import 'bootstrap/dist/css/bootstrap.min.css';
import './train.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import VueSweetalert2 from "sweetalert2";
import { useState, useEffect } from "react";
import Axios from "axios";

const Train = () => {
  // Define state variables
  const [trainID, setTrainID] = useState('');
  const [trainName, setTrainName] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState(null); // Use null for Date objects
  const [arrivalTime, setArrivalTime] = useState(null);     // Use null for Date objects
  const [userSearch, setUserSearch] = useState('');
  const [listOfSchedules, setListOfSchedules] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  // Function to create a new schedule
  const createSchedule = () => {
    Axios.post("https://localhost:44304/api/TrainSchedule", {
      trainID,
      trainName,
      origin,
      destination,
      departureTime,
      arrivalTime,
    })
      .then((response) => {
        if (response.status === 200) {
          // Check if the reservation was successful
          // Update the list of schedules
          setListOfSchedules([
            ...listOfSchedules,
            {
              trainID,
              trainName,
              origin,
              destination,
              departureTime,
              arrivalTime,
            },
          ]);

          VueSweetalert2.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1000,
            icon: 'success',
            title: 'Schedule added to the system',
          }).then(function () {
            // Redirect the user to the desired page
            window.location.href = "/backofficer/train";
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  };

  // Fetch the list of schedules when the component mounts
  useEffect(() => {
    Axios.get("https://localhost:44304/api/TrainSchedule")
      .then((response) => {
        setListOfSchedules(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  }, []);

  return (
    <div className="ticket-booking-container">
      <h1 className="fw-bold">Train Management</h1>
      <div className="row mt-5 ps-3">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="row">
            {/* Content for the left side */}
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          {/* Content for the right side */}
        </div>
      </div>
      <div className="row mt-5 px-3">
        <form>
          <div className="row mt-4">
            <div className="col">
              <input
                type="text"
                value={trainID}
                className="form-control"
                placeholder="Train No"
                onChange={(e) => {
                  setTrainID(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <input
                type="text"
                value={trainName}
                className="form-control"
                placeholder="Train Name"
                onChange={(e) => {
                  setTrainName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <DatePicker
                id="departure-time-picker"
                placeholderText="Departure Time"
                selected={departureTime}
                onChange={(date) => setDepartureTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
            <div className="col">
              <DatePicker
                id="arrival-time-picker"
                placeholderText="Arrival Time"
                selected={arrivalTime}
                onChange={(date) => setArrivalTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <input
                type="text"
                value={origin}
                className="form-control"
                placeholder="Origin"
                onChange={(e) => {
                  setOrigin(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <input
                type="text"
                value={destination}
                className="form-control"
                placeholder="Destination"
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              {/* Add any additional fields as needed */}
            </div>
          </div>
          <div className="row mt-5">
            <div className="d-flex justify-content-around align-items-center">
              <button
                type="button"
                className="btn btn-primary btnRegister"
                onClick={createSchedule}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-secondary btnUpdate"
              >
                Update
              </button>
              <button type="button" className="btn btn-danger btnDelete">
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="row mt-5 px-3">
        <h6 className="mb-0 fw-bold mt-2 mb-2 fs-5">Current Schedules</h6>
        <div className="row mb-5">
          <div className="d-flex justify-content-end align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              <input
                id="searchID"
                type="text"
                className="form-control col-8 me-5 px-5"
                placeholder="Train No"
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
                <th scope="col">Train Schedule ID</th>
                <th scope="col">Train ID</th>
                <th scope="col">Train Name</th>
                <th scope="col">Departure Time</th>
                <th scope="col">Arrival Time</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Action</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {listOfSchedules &&
                listOfSchedules
                  .filter((value) => {
                    if (userSearch === "") {
                      return value;
                    } else if (
                      value.trainID
                        .toLowerCase()
                        .includes(userSearch.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((TrainSchedule, i) => (
                    <tr className="crs-tr" data-status="active" key={i}>
                      <td className="crs-td">{TrainSchedule.id}</td>
                      <td className="crs-td">{TrainSchedule.trainID}</td>
                      <td className="crs-td">{TrainSchedule.trainName}</td>
                      <td className="crs-td">{TrainSchedule.departureTime}</td>
                      <td className="crs-td">{TrainSchedule.arrivalTime}</td>
                      <td className="crs-td">{TrainSchedule.origin}</td>
                      <td className="crs-td">{TrainSchedule.destination}</td>
                      <td>
                        <i className="fa-solid fa-pen me-3 text-primary d-inline fa-2x" onClick={() => {
                          // Handle update functionality
                        }} />
                        <i className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline fa-2x" onClick={() => {
                          // Handle delete functionality
                        }} />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Train;
