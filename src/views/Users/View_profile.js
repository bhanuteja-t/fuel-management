import React, { useEffect, useState } from "react";
import Default from "../../assets/icons/Cyspace_logo.jpg";
import { deleteUserByID, getbankdetails, getUserByID, getusers } from "../../Apicalls";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../Auth";
var assigntoname;
const View_profile = (props) => {
  const photoUrl = Default;
  const [user, setUser] = useState([]);
  const [bank, setBank] = useState([]);
  const [values, seValues] = useState([])
  const id = props.match.params.id;
  const preload = (id) => {
    getUserByID(id).then((data) => {
      setUser(data.data);
    });
    getusers().then((data) => {
      if (data.error) {
      } else {
        seValues(data.data);
      }
    });
    getbankdetails().then((data) => {
      if (data.error) {
      } else {
        setBank(data.data);
      }
    });
  };
  useEffect(preload, []);
  assigntoname = values.filter((ur) => id === ur.assignto);
  const history = useHistory();
  const deleteuserbtn = (id) => {
    let answer = window.confirm("Confirm ok to Delete User ");
    if (answer) {
      deleteUserByID(id).then((data) => {
        if (data.error) {
        } else {
          history.push("/Userslist");
          return preload();
        }
      }
      )
    };
  }
  var filteredvalue = [];
  for (let i = 0; i < bank.length; i = i + 1) {
    if (bank[i].userid === id) {
      filteredvalue = Object.assign([], bank[i]);
    }
  }
  return (
    <div className="profile-container">
      <div className="container-fluid">
        <table class="table table-hover table-bordered">
          <tr align="center">
            <h2>
              {" "}
              {user.first_name}'s Profile
            </h2>{" "}
          </tr>
          <hr />
          <div className="profile-second-container row">
            <div className=" col-sm-3">
              <img
                style={{ height: "200px", width: "200px" }}
                className="img-thumbnail"
                src={photoUrl}
                onError={(i) => {
                  i.target.src = `${Default}`;
                }}
                alt={user.first_name}
              />
            </div>
            <div className="col-md-4">
              <div style={{ backgroundColor: "Grey", textAlign: "center" }}>
                <h2>Personal Details</h2>
              </div>{" "}
              <hr />
              <div className="lead">
                <p>
                  <b>Name : </b>
                  <span style={{ fontWeight: "bold" }}>
                    {user.first_name}
                  </span>{" "}
                </p>
                <p>
                  <b>Designation : </b> {user.designation}
                </p>
                <p className="lead">Email : {user.email}</p>
                <p className="lead">Site : {user.site}</p>
                <p className="lead">DOB : {user.Date_of_birth}</p>
                <p className="lead">Address : {user.Address}</p>
                <p className="lead">Phn.No : {user.phone_number}</p>
                <p className="lead">Emergency Phn.No : {user.emergency_phone_number ? user.emergency_phone_number : " Not Provided "}</p>
              </div>
              <hr />
              <div align='center'>
            <button>
              <Link color='black' to={`/Edituser/${user.id}`}>Edit
              </Link>
            </button>
          </div>
            </div>
              <div className="col-md-4">
                <div className="col-md-12">
                  <div style={{ backgroundColor: "Grey", textAlign: "center" }}>
                    <h2>Bank Details</h2>
                  </div>{" "}
                  <hr />
                  <div className="lead">
                    <p>
                      <b>Bank Name : </b>
                      <span style={{ fontWeight: "bold" }}>
                        {filteredvalue.bankName}
                      </span>{" "}
                    </p>
                    <p>
                      <b>Account Name : </b> {filteredvalue.accountName}
                    </p>
                    <p className="lead">BSB : {filteredvalue.BSB}</p>
                    <p className="lead">Account Number : {filteredvalue.accountNumber}</p>
                    <p className="lead">Fund ID : {filteredvalue.fundId}</p>
                    <p className="lead">Fund USI : {filteredvalue.fundUSI}</p>
                  </div>
                  <hr />
                  {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
                    <button style={{ marginLeft: '160px' }}><Link color='black' to={`/Bankdetailsedit/${filteredvalue._id}`}>Edit
                    </Link></button>
                  )}
                </div>
              </div>
          </div>
          <hr />        
            {user.designation === "manager" && (
              <div className="col-md-4">
                <div className="col-md-12">
                  <div style={{ backgroundColor: "Grey", textAlign: "center" }}>
                    <h2>Workers List</h2>
                  </div>{" "}
                  <hr />
                  {assigntoname.length >= 1 ? (
                    <>

                      {assigntoname.map((aa) => {
                        return (
                          <div style={{ overflow: 'hidden' }}>
                            <p style={{ float: 'left' }}>Name : {aa.first_name}</p>
                            <p style={{ float: 'right' }}>Phone Number: {aa.phone_number}</p>
                          </div>
                        )
                      })}
                    </>
                  )
                    : (
                      "No Workers Assigned Yet..."
                    )}
                  <hr />
                </div>
              </div>
            )}
          <hr />
          <div align='center'>
          {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
              <button marginLeft='200px'
                onClick={() => { deleteuserbtn(user.id) }}
              >Delete Profile</button>
            )}
            </div>
        </table>
      </div>
    </div>
  );
};
export default View_profile;
