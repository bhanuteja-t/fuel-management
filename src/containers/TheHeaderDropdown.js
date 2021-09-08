// import React, { useState, useEffect } from 'react'
// import { Link } from "react-router-dom";
// import {
//   CDropdown,
//   CDropdownItem,
//   CDropdownMenu,
//   CDropdownToggle,
//   CImg
// } from '@coreui/react'
// import { Modal, Form } from "semantic-ui-react";
// import { List, Drawer, Button, IconButton, Badge } from '@material-ui/core';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import logo from '../assets/icons/logo1.png'
// import { isAuthenticated, signout } from 'src/Auth'
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CIcon from '@coreui/icons-react'
// import { Addsiteorsupplier, getleavesfornotifications, updateleavesapi } from 'src/Apicalls';
// function exampleReducer(state, action) {
//   switch (action.type) {
//     case "close":
//       return { open: false };
//     case "open":
//       return { open: true, size: action.size };
//     default:
//       throw new Error("Unsupported action...");
//   }
// }
// const TheHeaderDropdown = () => {
//   const [length, setLength] = useState();
//   const [updateleaves, setUpdateleaves] = useState({
//     isConfirmed: true
//   });
//   const [leaves, setLeaves] = useState()
//   const currentuser = isAuthenticated();
//   const notify = () => {
//     toast.success(<h3>Supplier Added Successfully</h3>, {
//       position: toast.POSITION.TOP_CENTER,
//       autoClose: 3000,
//     });
//   };
//   const notify1 = () => {
//     toast.success(<h3>Site Added Successfully</h3>, {
//       position: toast.POSITION.TOP_CENTER,
//       autoClose: 3000,
//     });
//   };
//   const [state, dispatch] = React.useReducer(exampleReducer, {
//     open: false,
//     size: undefined,
//   });
//   const [secondOpen, setSecondOpen] = React.useState(false)
//   const [thirdOpen, setThirdOpen] = React.useState(false)
//   const { open, size } = state;
//   const [site, setSite] = useState({
//     sitename: "",
//     sitetype: "site"
//   })
//   const { sitename } = site;
//   const [supplier, setSupplier] = useState({
//     suppliername: "",
//     suppliertype: "supplier"
//   })
//   const { suppliername } = supplier;
//   const handleChange = (name) => (event) => {
//     const value = event.target.value;
//     setSite({ ...site, [name]: value });
//   };
//   const handleChange1 = (name) => (event) => {
//     const value = event.target.value;
//     setSupplier({ ...supplier, [name]: value });
//   };
//   const createsupplier = (event) => {
//     event.preventDefault();
//     Addsiteorsupplier(supplier).then((data) => {
//       if (data.error) {
//         setSupplier({ ...supplier, error: data.error });
//       } else {
//         setSupplier({
//           ...supplier,
//           suppliername: data.suppliername,
//         });
//       }
//       notify();
//       dispatch({ type: "close" })
//     })
//   }
//   const createsite = (event) => {
//     event.preventDefault();
//     Addsiteorsupplier(site).then((data) => {
//       if (data.error) {
//         setSite({ ...site, error: data.error });
//       } else {
//         setSite({
//           ...site,
//           sitename: data.sitename,
//         });
//       }
//       notify1();
//       dispatch({ type: "close" })
//     })
//   }
//   const preload = () => {
//     getleavesfornotifications().then((data) => {
//       if (data.error) {
//         setLeaves({ ...leaves, error: data.error });
//       } else {
//         setLeaves(data.data.leaves);
//         setLength(data.data.recordsLength)
//       }
//     });
//   }
//   useEffect(() => {
//     preload()
//   }, []);
//   const confirmleave = (id) => {
//     updateleavesapi(id, updateleaves).then((data) => {
//       if (data.error) {
//         setUpdateleaves({ ...updateleaves, error: data.error });
//       } else {
//         setUpdateleaves({
//           ...updateleaves,
//         });
//       }
//       preload();
//     })
//   }
//   const [open1, setOpen1] = useState(false);
//   const list = (anchor) => (
//     <div style={{ width: 350 }} onClick={() => setOpen1(false)}>
//       {length >= 1 ? leaves.map((id, val) => {
//         return (
//           <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
//             <ul class="MuiList-root MuiList-padding" >
//               <div style={{ margin: '2px 10px 2px 10px', border: '1px solid gray', }}>
//                 <div style={{ margin: '20px' }}>
//                   <p>Applied By: {id.username}</p>
//                   <p>Applied On: {id.createdOn}</p>
//                   <p>Leave Description: {id.LeaveDescription}</p>
//                   <p>
//                     <Button style={{ color: 'green', backgroundColor:'#ccc', }} onClick={() => confirmleave(id._id)}>approve</Button>{ " "}
//                     <Button style={{backgroundColor:'#ccc', color: 'red', display: window.innerWidth <= 800 ? "none" : "" }}>reject</Button>
//                   </p>
//                 </div>
//               </div>
//             </ul>
//           </List>
//         )
//       }
//       ) : <div style={{ textAlign: 'center', marginTop: '20px' }}>No Notifications</div>
//       }
//     </div> 
//   );
//   return (
//     <div>
//       {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
//         <div style={{ width: '40px', float: 'left' }}>
//           <IconButton style={{ backgroundColor: "white", marginRight: '20px', width: 32, height: 32, marginTop: '10px' }}>
//             <Badge badgeContent={length} color="primary">
//               <NotificationsIcon onClick={() => setOpen1(true)} />
//             </Badge>
//             <Drawer open={open1} anchor={"right"} onClose={() => setOpen1(false)}>
//               {list()}
//             </Drawer>
//           </IconButton>
//         </div>
//       )}
//       <div style={{ display: 'flex' }}>
//         <CDropdown
//           inNav
//           className="c-header-nav-items mx-2"
//           direction="down"
//         >
//           <CDropdownToggle className="c-header-nav-link" caret={false}>
//             <div className="c-avatar">
//               <CImg
//                 style={ggg}
//                 src={logo}
//                 className="c-avatar-img"
//                 alt="admin@bootstrapmaster.com"
//               />
//             </div>
//             <div style={ccc}>
//               <span className="name"><b style={{ color: 'black' }}>{currentuser.data.user.designation}</b></span>
//             </div>
//           </CDropdownToggle>
//           <CDropdownMenu className="pt-0" placement="bottom-end" >
//             <CDropdownItem
//               header
//               tag="div"
//               color="light"
//               className="text-center"
//             >
//               <strong>Profile</strong>
//             </CDropdownItem>
//             <CDropdownItem>
//               <Link style={{ color: "black" }} to="/Contactdetails">
//                 <CIcon name="cil-contact" className="mfe-2" />
//                 Personal Details
//               </Link>
//             </CDropdownItem>
//             {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
//               <CDropdownItem>
//                 <Link style={{ color: "black" }} to="/createuser">
//                   <CIcon name="cil-user-plus" className="mfe-2" />
//                   Add Employee
//                 </Link>
//               </CDropdownItem>
//             )}
//             {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
//               <CDropdownItem>
//                 <Link style={{ color: "black" }} to="/Bankdetails">
//                   <CIcon name="cil-bank" className="mfe-2" />
//                   Bank Details
//                 </Link>
//               </CDropdownItem>
//             )}
//             {isAuthenticated() && isAuthenticated().data.user.designation === 'worker' && (
//               <CDropdownItem>
//                 <Link style={{ color: "black" }} to="/Workerroaster">
//                   <CIcon name="cil-bank" className="mfe-2" />
//                   Worker Roaster
//                 </Link>
//               </CDropdownItem>
//             )}
//             {isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
//               <CDropdownItem>
//                 <Link style={{ color: "black" }} to="/UploadRoaster">
//                   <CIcon name="cil-task" className="mfe-2" />
//                   Roaster
//                 </Link>
//               </CDropdownItem>
//             )}
//             {isAuthenticated().data.user.designation === 'SuperAdmin' || 'manager' (
//               <CDropdownItem >
//                 <Link style={{ color: "black" }} to="/Applyleave">
//                   <CIcon name="cil-envelope-open" className="mfe-2" />
//                   Leaves
//                 </Link>
//               </CDropdownItem>
//             )}
//             <CDropdownItem onClick={() => {
//               signout(() => {})
//             }}>
//               <CIcon name="cil-chart-pie" className="mfe-2" />
//               Signout
//             </CDropdownItem>
//             {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
//               <CDropdownItem>
//                 <Button
//                   onClick={() => dispatch({ type: "open", size: "tiny" })}
//                 >
//                   Add Site/Supplier
//                 </Button>
//                 <Modal
//                   style={modalstyling}
//                   size={size}
//                   open={open}
//                   onClose={() => dispatch({ type: "close" })}
//                 >
//                   <Modal.Header>Select Category</Modal.Header>
//                   <Modal.Content>
//                     <Button style={{ marginLeft:window.innerWidth <= 800 ?'': '80px' }} onClick={() => setSecondOpen(true)} primary>
//                       Create Site
//                     </Button>
//                     <Button onClick={() => setThirdOpen(true)} primary>
//                       Create Supplier
//                     </Button>
//                   </Modal.Content>
//                   <Modal
//                     onClose={() => setSecondOpen(false)}
//                     open={secondOpen}
//                     style={modalstyling}
//                     size='small'
//                   >
//                     <Modal.Header>Create Site</Modal.Header>
//                     <Modal.Content>
//                       <div>
//                         <Form style={{ width: '50%' }}>
//                           <div class="block">
//                             <label >Enter Site Name :</label>
//                             <input type='text' value={sitename} onChange={handleChange("sitename")} />
//                           </div>
//                           <Button style={{ marginTop: '5px' }} color="green" onClick={createsite}>Submit</Button>
//                           <Button style={{ marginTop: '5px' }} color="black" onClick={() => setSecondOpen(false)}>Cancel</Button>
//                         </Form>
//                       </div>
//                     </Modal.Content>
//                   </Modal>
//                   <Modal
//                     onClose={() => setThirdOpen(false)}
//                     open={thirdOpen}
//                     style={modalstyling}
//                     size='small'
//                   >
//                     <Modal.Header>Create Supplier</Modal.Header>
//                     <Modal.Content>
//                       <Form style={{ width: '50%' }}>
//                         <div class="block">
//                           <label>Enter Supplier Name</label>
//                           <input type='text' value={suppliername} onChange={handleChange1("suppliername")} />
//                         </div>
//                         <Button style={{ marginTop: '5px',backgroundColor:"blue" }}  onClick={createsupplier}>Submit</Button>
//                         <Button style={{ marginTop: '5px',backgroundColor:""  }} onClick={() => setThirdOpen(false)}>Cancel</Button>
//                       </Form>
//                     </Modal.Content>
//                   </Modal>
//                 </Modal>
//               </CDropdownItem>
//             )}
//           </CDropdownMenu>
//         </CDropdown>
//       </div>
//     </div>
//   )
// }
// export default TheHeaderDropdown
// const modalstyling = {
//   marginLeft: window.innerWidth <= 800 ?'':"200px",
//   height: window.innerWidth <= 800 ?"auto":"auto",
//   top: window.innerWidth <= 800 ?'auto':"auto",
//   left: window.innerWidth <= 800 ?'auto':"auto",
//   bottom: window.innerWidth <= 800 ?'auto':"auto",
//   right: window.innerWidth <= 800 ?'auto':"auto",
//   width: window.innerWidth <= 800 ?'80%':'30%'
// };
// const ggg = {
//   marginRight: "15px",
// }
// const ccc = {
//   padding: "2px",
//   backgroundColor: 'white',
//   borderRadius: "5px"
// }



import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import { Modal, Form } from "semantic-ui-react";
import { List, Drawer, Button, IconButton, Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import logo from '../assets/icons/logo1.png'
import { isAuthenticated, signout } from '../Auth'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CIcon from '@coreui/icons-react'
import { Addsiteorsupplier, getleavesfornotifications, updateleavesapi } from '../Apicalls';
function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}
const TheHeaderDropdown = () => {
  // const history = useHistory();
  const currentuser = isAuthenticated();
    const [length, setLength] = useState();
  const [updateleaves, setUpdateleaves] = useState({
    isConfirmed: true
  });
  const [leaves, setLeaves] = useState()
  console.log("Username Check=", currentuser.data.user.first_name);
  const notify = () => {
    toast.success(<h3>Incident Noted Successfully</h3>, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
    });
};
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const [secondOpen, setSecondOpen] = React.useState(false)
  const [thirdOpen, setThirdOpen] = React.useState(false)
  const { open, size } = state;
  const [site, setSite] = useState({
    sitename: "",
    sitetype:"site"
  })
  const { sitename,sitetype } = site;
  const [supplier, setSupplier] = useState({
    suppliername: "",
    suppliertype:"supplier"
  })
  const { suppliername, suppliertype } = supplier;
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    console.log("valuevaluevalue->", value);
    setSite({ ...site, [name]: value });
    console.log("In handelChange function = ", site);
  };
  const handleChange1 = (name) => (event) => {
    const value = event.target.value;
    console.log("valuevaluevalue->", value);
    setSupplier({ ...supplier, [name]: value });
    console.log("In handelChange function = ", supplier);
  };

    const preload = () => {
    getleavesfornotifications().then((data) => {
      if (data.error) {
        setLeaves({ ...leaves, error: data.error });
      } else {
        setLeaves(data.data.leaves);
        setLength(data.data.recordsLength)
      }
    });
  }
  useEffect(() => {
    preload()
  }, []);


    const confirmleave = (id) => {
    updateleavesapi(id, updateleaves).then((data) => {
      if (data.error) {
        setUpdateleaves({ ...updateleaves, error: data.error });
      } else {
        setUpdateleaves({
          ...updateleaves,
        });
      }
      preload();
    })
  }

  const createsupplier = (event) => {
    console.log("Submit button clicked...");
    event.preventDefault();
    Addsiteorsupplier(supplier).then((data) => {
      console.log("Maintain Data check=", supplier);
      if (data.error) {
        setSupplier({ ...supplier, error: data.error });
      } else {
        console.log("Setting Values in else part=");
        setSupplier({
          ...supplier,
          suppliername:data.suppliername,
        });
      }
        notify();
        dispatch({ type: "close" })
        console.log("After Toast method");
      })
  }

  const createsite = (event) => {
    console.log("Submit button clicked...");
    event.preventDefault();
    Addsiteorsupplier(site).then((data) => {
      console.log("Maintain Data check=", site);
      if (data.error) {
        setSite({ ...site, error: data.error });
      } else {
        console.log("Setting Values in else part=");
        setSite({
          ...site,
          sitename:data.sitename,
        });
      }
        notify();
        dispatch({ type: "close" })
        console.log("After Toast method");
      })
  }
  const [open1, setOpen1] = useState(false);
    const list = (anchor) => (
    <div style={{ width: 350 }} onClick={() => setOpen1(false)}>
      {length >= 1 ? leaves.map((id, val) => {
        return (
          <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <ul class="MuiList-root MuiList-padding" >
              <div style={{ margin: '0px 20px 0px 20px', border: '1px solid gray', }}>
                <div style={{ margin: '20px' }}>
                  <p>Applied By: {id.username}</p>
                  <p>Applied On: {id.createdOn}</p>
                  <p>Leave Description: {id.LeaveDescription}</p>
                  <p>
                    <Button style={{ color: 'green', backgroundColor:'#ccc', }} onClick={() => confirmleave(id._id)}>approve</Button>{ " "}
                    <Button style={{backgroundColor:'#ccc', color: 'red', display: window.innerWidth <= 800 ? "none" : "" }}>reject</Button>
                  </p>
                </div>
              </div>
            </ul>
          </List>
        )
      }
      ) : <div style={{ textAlign: 'center', marginTop: '20px' }}>No Notifications</div>
      }
    </div> 
  );

  return (
        <div>
      {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
        <div style={{ width: '40px', float: 'left' }}>
          <IconButton style={{ backgroundColor: "white", marginRight: '20px', width: 32, height: 32, marginTop: '10px' }}>
            <Badge badgeContent={length} color="primary">
              <NotificationsIcon onClick={() => setOpen1(true)} />
            </Badge>
            <Drawer open={open1} anchor={"right"} onClose={() => setOpen1(false)}>
              {list()}
            </Drawer>
          </IconButton>
        </div>
      )}
    <div style={{ display: 'flex' }}>
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImg
              style={ggg}
              src={logo}
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />

          </div>
          <div style={ccc}>
            <span className="name"><b style={{ color: 'black' }}>{currentuser.data.user.designation}</b></span>
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end" >
          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong>Profile</strong>
          </CDropdownItem>
          <CDropdownItem>
            <Link style={{ color: "black" }} to="/Contactdetails">
              <CIcon name="cil-contact" className="mfe-2" />
              Personal Details
            </Link>
          </CDropdownItem>
          {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
            <CDropdownItem>
              <Link style={{ color: "black" }} to="/createuser">
                <CIcon name="cil-user-plus" className="mfe-2" />
                Add Employee
              </Link>
            </CDropdownItem>
          )}
          {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
            <CDropdownItem>
              <Link style={{ color: "black" }} to="/Bankdetails">
                <CIcon name="cil-bank" className="mfe-2" />
                Bank Details
              </Link>
            </CDropdownItem>
          )}
          {isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
            <CDropdownItem>
              <Link style={{ color: "black" }} to="/UploadRoaster">
                <CIcon name="cil-task" className="mfe-2" />
                Roaster
              </Link>
            </CDropdownItem>
          )}
          {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' || 'manager' && (
          <CDropdownItem >
            <Link style={{ color: "black" }} to="/Applyleave">
              <CIcon name="cil-envelope-open" className="mfe-2" />
              Leaves
            </Link>
          </CDropdownItem>
          )}
          <CDropdownItem onClick={() => {
            signout(() => {
            })
          }}>
            <CIcon name="cil-chart-pie" className="mfe-2" />
            Signout
          </CDropdownItem>

          {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
              <CDropdownItem>
                <Button
                  onClick={() => dispatch({ type: "open", size: "tiny" })}
                >
                  Add Site/Supplier
                </Button>
                <Modal
                  style={modalstyling}
                  size={size}
                  open={open}
                  onClose={() => dispatch({ type: "close" })}
                >
                  <Modal.Header>Select Category</Modal.Header>
                  <Modal.Content>
                    <Button style={{ marginLeft:window.innerWidth <= 800 ?'': '80px' }} onClick={() => setSecondOpen(true)} primary>
                      Create Site
                    </Button>
                    <Button onClick={() => setThirdOpen(true)} primary>
                      Create Supplier
                    </Button>
                  </Modal.Content>
                  <Modal
                    onClose={() => setSecondOpen(false)}
                    open={secondOpen}
                    style={modalstyling}
                    size='small'
                  >
                    <Modal.Header>Create Site</Modal.Header>
                    <Modal.Content>
                      <div>
                        <Form style={{ width: '50%' }}>
                          <div class="block">
                            <label >Enter Site Name :</label>
                            <input type='text' value={sitename} onChange={handleChange("sitename")} />
                          </div>
                          <Button style={{ marginTop: '5px' }} color="green" onClick={createsite}>Submit</Button>
                          <Button style={{ marginTop: '5px' }} color="black" onClick={() => setSecondOpen(false)}>Cancel</Button>
                        </Form>
                      </div>
                    </Modal.Content>
                  </Modal>
                  <Modal
                    onClose={() => setThirdOpen(false)}
                    open={thirdOpen}
                    style={modalstyling}
                    size='small'
                  >
                    <Modal.Header>Create Supplier</Modal.Header>
                    <Modal.Content>
                      <Form style={{ width: '50%' }}>
                        <div class="block">
                          <label>Enter Supplier Name</label>
                          <input type='text' value={suppliername} onChange={handleChange1("suppliername")} />
                        </div>
                        <Button style={{ marginTop: '5px',backgroundColor:"blue" }}  onClick={createsupplier}>Submit</Button>
                        <Button style={{ marginTop: '5px',backgroundColor:""  }} onClick={() => setThirdOpen(false)}>Cancel</Button>
                      </Form>
                    </Modal.Content>
                  </Modal>
                </Modal>
              </CDropdownItem>
            )}
        </CDropdownMenu>
      </CDropdown>
    </div>
    </div>
  )
}

export default TheHeaderDropdown
const modalstyling = {
  marginLeft: "200px",
  height: "auto",
  top: "auto",
  left: "auto",
  bottom: "auto",
  right: "auto",
  width: '30%'
};
const ggg = {
  marginRight: "15px",
}
const ccc = {
  padding: "5px",
  backgroundColor: 'white',
  borderRadius: "5px"
}

