import React, { useEffect, useState } from "react";
import Default from "../../assets/icons/Cyspace_logo.jpg";
import { Link } from "react-router-dom";
import { getusers } from "../../Apicalls";
var assigntoname;
const UserCollection = props => {
  const [users, setUsers] = useState([]);
  const user = props.user;
  const i = props.i;
  const preload = () => {
    getusers().then((data) => {
      if (data.error) {
      } else {
        setUsers(data.data);
      }
    });
  };
  assigntoname = users.filter((ur) => ur._id === user.assignto);
  useEffect(() => {
    preload();
  }, []);
  return (
    <>
      <div key={i} style={{width:'400px'}} className="col-md-4">
        <div className="card">
          <div className="avatar mx-auto">
            <img
              alt="avatar"
              style={{ height: "128px" }}
              src={Default}
              onError={i => {
                i.target.src = `${Default}`;
              }}
              className="rounded-circle"
            />
          </div>
          <div className="card-body">
            <h4>
              {user.first_name}
            </h4>
            <hr />
            <div >
              <p>Role: {user.designation}</p>
              {assigntoname.map((aa) => {
                return (
                  <p>Assign To: {aa.first_name}</p>
                )
              })}
              <p>Site: {user.site}</p>
            </div>
            <p style={{marginTop:'8px'}}><Link to={`View_profile/${user._id}`}>View Profile</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserCollection;
