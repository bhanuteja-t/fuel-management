import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { GuardSpinner } from "react-spinners-kit";
import UserCollection from "./users_collection"
import { getusers } from "../../Apicalls";
import { isAuthenticated } from "../../Auth";
const currentuser = isAuthenticated();
const uid = currentuser.data.user.userid;
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      rnpole="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
const Manageruserslist = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const preload = () => {
    getusers().then((data) => {
      if (data.error) {
      } else {
        setUsers(data.data);
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <>
      <div style={{backgroundColor: "#686769"}} className="row">
        <Tabs
          class="nav nav-pills nav-fill"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          style={{
            backgroundColor: "#B3DC4A",
            width: window.innerWidth <= 800 ? "114%" : "100%",
          }}
        >
          <Tab label="Workers" {...a11yProps(1)} />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <div>
            <TabPanel dir={theme.direction}>
              <div className="row">
                {loading ? (
                  <div style={{ marginLeft: "46%", marginTop: "22%" }}>
                    <GuardSpinner size={50} color="#B3DC4A" />
                  </div>
                ) : (
                  users.map((user, i) => {
                    if (user.designation === 'worker' && user.assignto === uid) {
                      return <UserCollection user={user} i={i} />;
                    } else {
                      return null;
                    }
                  })
                )}
              </div>
            </TabPanel>
          </div>
        </SwipeableViews>
      </div>
    </>
  );
};
export default Manageruserslist;
