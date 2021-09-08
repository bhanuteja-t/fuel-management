import React from "react";
import {
  CImg
} from '@coreui/react'
import pht from "../../assets/icons/Unitednight.jpg";
export const MyContext = React.createContext();
export const MyProvider = () => {
}
const Dashboard = () => {
  return (
          <CImg style={imgstyle}
            src={pht}
          />
  );
};
export default Dashboard;
const imgstyle = {
width: "100%",
height:'610px',
};
