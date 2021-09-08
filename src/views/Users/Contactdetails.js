import React, { useState, useEffect } from "react";
import Default from "../../assets/icons/Cyspace_logo.jpg";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getbankdetails, getUserByID } from "../../Apicalls";
import { isAuthenticated } from "../../Auth";
function Contactdetails() {
  const photoUrl = Default;
  const [user, setUser] = useState([]);
  const [bank, setBank] = useState([]);
  const currentuser = isAuthenticated();
  const uid = currentuser.data.user.userid;
  const preload = () =>{
    getUserByID(uid).then((data) => {
      if (data.error) {
      } else {
        setUser(data.data);
      }
    });
    getbankdetails().then((data) => {
      if (data.error) {
      } else {
        setBank(data.data);
      }
    });
  }
  useEffect(() => {
    preload();
  },[]);
  var filteredvalue = []
  for (let i = 0; i < bank.length; i = i + 1) {
    if (bank[i].userid === uid) {
      filteredvalue = Object.assign([], bank[i]);
    }
  }
  return (
    <div className="profile-container">
      <div align='center' className="container">
        <table class="table table-hover table-bordered">
          <hr />
          <div className="profile-second-container row">
            <div className=" col-sm-3">
              <img
                style={{ height: "200px", width: "200px" }}
                alt="description"
                className="img-thumbnail"
                src={photoUrl}
                onError={(i) => {
                  i.target.src = `${Default}`;
                }}
              />
            </div>
            <div className="col-md-4">
              <div style={{ backgroundColor: "Grey", textAlign: "center" }}>
                <h2>User Details</h2>
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
              </div>
              <hr />
              {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
                <button style={{ marginLeft: '160px' }} ><Link color='black' to={`/Edituser/${user.id}`}>Edit
                </Link></button>
              )}
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
          <div><Link to={`/Changepassword`}>Change Password</Link></div>
        </table>
      </div>
    </div>
  );
}
export default Contactdetails;