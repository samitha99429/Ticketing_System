import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './traveler.css'
import Axios from "axios";
import VueSweetalert2 from "sweetalert2";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Traveler= () => {

  const [nic, settraveler_nic] = useState("");
  const [firstName,settravelerfName] = useState("");
  const [lastName, settravelerlName] = useState("");
  const [phone, setcontacts] = useState("");
  const [country, setcountry] = useState("");
  const [dob, setdob] = useState("");
  const [email, setemail] = useState("");
  const [passwords, setpassowrd] = useState("");
  const [listOftravelers, setlistOftravelers] = useState([]);
  const [image,setproImage] = useState("");
  const [isActive,setisActive] = useState("");
  const [userSearch, setuserSearch] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [reenterNewPassword,setreenterNewPassword] = useState("");


  const handleSubmit = (e) => {
  
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      createTraveler();
    }
    setFormErrors(errors);
  };
  
  const validateNIC = (nic) => {
    // Regular expression pattern for a Sri Lankan NIC
    const nicPattern = /^\d{9}[Vv]$/;
  
    return nicPattern.test(nic);
  };
  
  const validateEmail = (email) => {
    // Regular expression pattern for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    return emailPattern.test(email);
  };
  
  const validate = () => {
    const errors = {};
    const requiredFields = [
      { key: 'nic', message: 'NIC is required!' },
      { key: 'firstName', message: 'First name is required!' },
      { key: 'lastName', message: 'Last name is required!' },
      { key: 'phone', message: 'Phone is required!' },
      { key: 'passwords', message: 'New Password is required!' }, // Fixed field name
      { key: 'country', message: 'Country is required!' },
      { key: 'email', message: 'Email is required!' },
      { key: 'reenterNewPassword', message: 'Re-enter New Password is required!' },
    ];
  
    requiredFields.forEach((field) => {
      if (!eval(field.key)) {
        errors[field.key] = field.message;
      }
    });
  
    if (phone && phone.length !== 10) {
      errors.phone = 'Phone number is invalid!';
    }
  
    if (validateNIC(nic)) {
      errors.traveler_nic = 'NIC is invalid!';
    }
  
    if (!validateEmail(email)) {
      errors.email = 'Email is invalid!';
    }
  
  
    return errors;
  };

  const createTraveler = () => {
    Axios.post("https://localhost:44304/api/Traveler", {
      
    nic,
    firstName,
    lastName,
    phone,
    country,
    email,
    passwords,
    dob,
    image,


    }).then((response) => {
      setlistOftravelers([
        ...listOftravelers,
        {
    nic,
    firstName,
    lastName,
    phone,
    country,
    email,
    passwords,
    dob,
    image,
      
        },
      ]);
    });
    VueSweetalert2.fire({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000,
        icon: 'success',
        title: 'Traveler details added to the System',
    }).then(function () {
      // Redirect the user
      window.location.href = "/backofficer/traveler";
    });
  };


  useEffect(() => {
    Axios.get("https://localhost:44304/api/Traveler").then((response) => {
      setlistOftravelers(response.data);
    });
  }, []);


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
                      setproImage(event.target.result);
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
                      setproImage(event.target.result);
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
    <div>
    <div className="main_container">
   <div className="item fw-bold fs-5">Traveler Management</div>
      <div className="item">
        <div className="row mt-5 ps-3">
          <div className="row">
            <div className=" col-lg-6 col-md-12 col-sm-12">
              <div className="row">
                <div className="d-flex justify-content-start align-items-center">
              
                </div>
              </div>
            </div>
            <div className=" col-lg-6 col-md-12 col-sm-12">
              <div className="row"></div>
            </div>
          </div>
        </div>
        <div className="row mt-5 px-3">
        <form>
                          <div className="row">
                              <div className="col d-flex justify-content-end align-items-center">
                                  <div className="col d-flex justify-content-end">
                                      <div>
                                          <button className="btn btnAddImg" id="btnAddImg" type="button" onClick={() => {
                                                    addcoverimage()
                                                  }}>
                                              <i className="fa fa-plus text-white" aria-hidden="true"/>
                                          </button>
                                          <button className="btn btnEditImg" id="btnEditImg" type="button" onClick={() => {
                                                   
                                                  }}>
                                              <i className="fa-solid fa-pen text-white"/>
                                          </button>
                                          <button className="btn btnImgDelete" id="btnImgDelete" type="button" onClick={() => {
                                                      
                                                  }} >
                                               
                                              <i className="fa-solid fa-trash-can d-inline text-white"/>
                                          </button>
                                      </div>
                                  </div>
                                  <div id="imgInputDiv">
                                      <div>
                                          <img id="ProfileImage" className="imgDiv" src={image}
                                               alt=""/>
                                      </div>
                                  </div>
                              </div>
                          </div>

            <div className="row mt-3">
           
              <div className="col-sm-6">
                <input
                   value={nic}
                  type="text"
                  className="form-control"
                  placeholder="Traveler nic"
                  onChange={(event) => {
                    settraveler_nic(event.target.value);
                  }}
                />
           <p class="alert-txt">{formErrors.nic}</p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
              <input
                  type="text"
                  value={firstName}
                  className="form-control"
                  placeholder="First name"
                  onChange={(event) => {
                    settravelerfName(event.target.value);
                  }}
                />
                 <p class="alert-txt">{formErrors.firstName}</p>
              </div>

              <div className="col">
                <input
                  type="text"
                  value={lastName}
                  className="form-control"
                  placeholder="Last name"
                  onChange={(event) => {
                    settravelerlName(event.target.value);
                  }}
                />
                <p class="alert-txt">{formErrors.lastName}</p>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col">
                <input
                  type="text"
                  value={phone}
                  className="form-control"
                  placeholder="Phone"
                  onChange={(event) => {
                    setcontacts(event.target.value);
                  }}
                />
            <p class="alert-txt">{formErrors.phone}</p>
              </div>
              <div className="col">
                <input
                
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  onChange={(event) => {
                    setcountry(event.target.value);
                  }}
                />
            <p class="alert-txt">{formErrors.country}</p>
              </div>
              <div className="col">
              <input
                name="Dateposted"
                value={dob}
                className="form-control"
                placeholder="Date Of Birth"
                type="text"
                onFocus={(e) => (e.target.type = 'date')}
                id="Dateposted"
                onChange={(e) => {
                  setdob(e.target.value);
                }}
              />
               <p class="alert-txt">{formErrors.dob}</p>
              </div>
              
            </div>
            
            <div className="row mt-4">
              <div className="col">
              <input
                  type="text"
                  value={email}
                  className="form-control"
                  placeholder="Email"
                  onChange={(event) => {
                    setemail(event.target.value);
                  }}
                />
                 <p class="alert-txt">{formErrors.email}</p>
              </div>

              <div className="col">
                <input
                 type="password"
                  className="form-control"
                  placeholder="Passowrd"
                  value={passwords}
                  onChange={(event) => {
                    setpassowrd(event.target.value);
                  }}
                />
                <p class="alert-txt">{formErrors.passwords}</p>
              </div>

              <div className="col">
                <input
                  type="password"
                  value={reenterNewPassword}
                  className="form-control"
                  placeholder="Re enter Passowrd"
                  onChange={(event) => {
                    setreenterNewPassword(event.target.value);
                  }}
                />
                <p class="alert-txt">{formErrors.reenterNewPassword}</p>
              </div>
            </div>
            <div className="row mt-5">
              <div className="d-flex justify-content-around align-items-center">
                <button
                  type="submit"
                  id="reg"
                  className="btn btnRegister "
                  onClick={handleSubmit}
                >
                 Register
                </button>
                <button
                  type="button"
                  id="edit"
                  className="btn btnUpdate"
                
                >
                  Update 
                </button>
                <button type="button" id="delete" className="btn btnDelete" 
                 >
                Delete
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row mt-5 px-3">
          <h6 className="mb-0 fw-bold mt-2 mb-2 fs-5">Current Travelers</h6>
          <div className="row mb-5">
            <div className="d-flex justify-content-end align-items-center">
              <div className="d-flex justify-content-center align-items-center">
                <input
                  id="searchID"
                  type="text"
                  className="form-control col-8 me-5 px-5"
                  placeholder="Traveler"
                 onChange={(e) => {
                  
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
            <table
              className="table table-striped custom-table"
              id="assignLabsTable"
            >
              <thead>
                <tr>
                  <th scope="col">Nic</th>
                  <th scope="col">Image</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">contacts</th>
                  <th scope="col">Country</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {listOftravelers &&
                     listOftravelers
                      .filter((value) => {
                        if (userSearch === "") {
                          return value;
                        } else if (
                          value.firstName
                            .toLowerCase()
                            .includes(userSearch.toLowerCase())
                        ) {
                          return value;
                        }
                      })
                      .map((Traveler, i) => (
                        <tr class="crs-tr" data-status="active">
                          <td className="crs-td">{Traveler.nic}</td>
                          <td className="crs-td">< img src={Traveler.image} class="crsthumimg" alt=""/></td>
                          <td className="crs-td">
                            {Traveler.firstName}
                          </td>
                          <td className="crs-td">
                            {Traveler.lastName}
                          </td>
                          <td className="crs-td">{Traveler.phone}</td>
                          <td className="crs-td">{Traveler.country}</td>
                          <td className="crs-td">{Traveler.isActive ? 'active' : 'deactive'}</td>
                          <td>
                    <i className="fa-solid fa-pen me-3 text-primary d-inline fa-2x" onClick={() => {
                      
                    }}/>
                    <i className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline fa-2x" onClick={() => {
                     
                    }}/>
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
);
  
};

export default Traveler;
