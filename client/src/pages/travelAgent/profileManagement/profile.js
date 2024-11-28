
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './profile.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Profile= () => {
    const [selectedTime, setSelectedTime] = useState(null);
  const [Vacancy_Id, setVacancy_Id] = useState('');
  const [Vacancy_Position, setVacancy_Position] = useState('');
  const [Vacancy_Category, setVacancy_Category] = useState('');
  const [No_of_Positions, setNo_of_Positions] = useState('');
  const [Location, setLocation] = useState('');
  const [Salary, setSalary] = useState('');
  const [Vacancy_Type, setVacancy_Type] = useState('');
  const [Date_Posted, setDate_Posted] = useState('');
  const [Details, setDetails] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [image_url, setimage_url] = useState("");

  const handleSubmit = () => {
    // Handle form submission here
  };

  const sendVacancyData = () => {
    // Handle sending vacancy data here
  };

  const addcoverimage= () => {
    let imgDiv = document.getElementById("imgInputDiv");

    let imgUploader = document.createElement("input");
    imgUploader.setAttribute("id", "imgUploader");
    imgUploader.setAttribute("type", "file");
    imgUploader.setAttribute("accept", "image/png, image/gif, image/jpeg");
    imgUploader.setAttribute("class", "d-none")
    imgDiv.appendChild(imgUploader);

    let imgUploaderElement = document.getElementById("imgUploader");
    console.log(imgUploaderElement);

    if (imgUploaderElement !== undefined && imgUploaderElement !== null) {
        imgUploaderElement.click();
        imgUploaderElement.addEventListener("change", () => {
            imgUploaderElement = document.getElementById("imgUploader");
            console.log(imgUploaderElement);
            if (imgUploaderElement.files[0] !== null && imgUploaderElement.files[0] !== undefined) {
                if (imgUploaderElement.files.length > 0) {
                    const fileReader = new FileReader();

                    fileReader.onload = function (event) {
                      setimage_url(event.target.result);
                    };

                    fileReader.readAsDataURL(imgUploaderElement.files[0]);
                }
            }
        });
    }

    document.getElementById("btnEditImg").removeAttribute("disabled");
    document.getElementById("btnImgDelete").removeAttribute("disabled");
}

const updatecoverimage = () => {
    document.getElementById("ProfileImage").removeAttribute("src");
    document.getElementById("btnAddImg").setAttribute("disabled", "true");

    let imgDiv = document.getElementById("imgInputDiv");

    let imgUploader = document.createElement("input");
    imgUploader.setAttribute("id", "imgUploader");
    imgUploader.setAttribute("type", "file");
    imgUploader.setAttribute("required", "true");
    imgUploader.setAttribute("accept", "image/png, image/gif, image/jpeg");
    imgUploader.setAttribute("class", "d-none")
    imgDiv.appendChild(imgUploader);

    let imgUploaderElement = document.getElementById("imgUploader");
    console.log(imgUploaderElement);

    if (imgUploaderElement !== undefined && imgUploaderElement !== null) {
        imgUploaderElement.click();
        imgUploaderElement.addEventListener("change", () => {
            imgUploaderElement = document.getElementById("imgUploader");
            console.log(imgUploaderElement);
            if (imgUploaderElement.files[0] !== null && imgUploaderElement.files[0] !== undefined) {
                if (imgUploaderElement.files.length > 0) {
                    const fileReader = new FileReader();

                    fileReader.onload = function (event) {
                      setimage_url(event.target.result);
                    };

                    fileReader.readAsDataURL(imgUploaderElement.files[0]);
                }
            }
        });
    }

}
  const removecoverImages = () => {
    document.getElementById("ProfileImage").removeAttribute("src");
    document.getElementById("btnImgDelete").setAttribute("disabled", "true");
  }
  return (
    <div className="ticket-booking-container">
      <h1 className="fw-bold">Profile Management</h1>
      <div className="row mt-5 ps-3">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="row">
            {/* <div className="d-flex justify-content-start align-items-center">
              <button id="btn-generate-report" className="btn btnRegister">
                Generate Report
              </button>
            </div> */}
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12"></div>
      </div>
      <div className="row mt-5 px-3">
        <form> 
            <div className="row">
                                <div className="col d-flex justify-content-end align-items-center">
                                    <div className="col d-flex justify-content-end">
                                        <div>
                                            <button className="btn btnAddImg" id="btnAddImg" type="button"
                                                    onClick={() => {
                                                      addcoverimage()
                                                    }}>
                                                <i className="fa fa-plus text-white" aria-hidden="true"/>
                                            </button>
                                            <button className="btn btnEditImg" id="btnEditImg" type="button"
                                                    onClick={() => {
                                                      updatecoverimage()
                                                    }}>
                                                <i className="fa-solid fa-pen text-white"/>
                                            </button>
                                            <button className="btn btnImgDelete" id="btnImgDelete" type="button"
                                                    onClick={() => {
                                                        removecoverImages()
                                                    }}>
                                                <i className="fa-solid fa-trash-can d-inline text-white"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div id="imgInputDiv">
                                        <div>
                                            <img id="ProfileImage" className="imgDiv" src={image_url}
                                                 alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
          <div className="row mt-4">
            
            <div className="col">
            <input
                type="text"
                value={Vacancy_Id}
                className="form-control"
                placeholder="First Name"
                onChange={(e) => {
                  setVacancy_Id(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Vacancy_Id}</p>
            </div>
            <div className="col">
            <input
                type="text"
                value={Vacancy_Id}
                className="form-control"
                placeholder="Last Name"
                onChange={(e) => {
                  setVacancy_Id(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Vacancy_Id}</p>
            </div>
            
          </div>
          <div className="row mt-4">
          <div className="col">
          <input
                type="text"
                value={Vacancy_Id}
                className="form-control"
                placeholder="NIC Number"
                onChange={(e) => {
                  setVacancy_Id(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Vacancy_Id}</p>
            </div>
            <div className="col">
            <input
                type="text"
                value={Location}
                className="form-control"
                placeholder="Phone Number"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Location}</p>
            </div>
            <div className="col">
            
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <input
                type="text"
                value={Location}
                className="form-control"
                placeholder="Email Address"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Location}</p>
            </div>
            <div className="col">
            <div className="col">
              <input
                type="text"
                value={Location}
                className="form-control"
                placeholder="passpo"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Location}</p>
            </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
            
            <input
                type="text"
                value={Location}
                className="form-control"
                placeholder="Train Name"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Location}</p>
            </div>
            <div className="col">
              <div className="form-group">
                <textarea
                  className="form-control"
                  value={Details}
                  id="exampleFormControlTextarea1"
                  placeholder="Details"
                  rows="3"
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                ></textarea>
                <p className="alert-txt">{formErrors.Details}</p>
              </div>
            </div>

          </div>
          <div className="row mt-5">
            <div className="d-flex justify-content-around align-items-center">
              <button
                type="submit"
                className="btn btn-primary btnRegister"
                onClick={handleSubmit}
              >
                Register
              </button>
              <button
                type="button"
                className="btn btn-secondary btnUpdate"
                onClick={sendVacancyData}
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
    </div>
  );
};

export default Profile;
