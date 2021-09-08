import axios from "axios";
import { Signin} from "../Apicalls";
export const signin = (userData) =>
  Signin(userData)   
export const authenticate = (data, next) => {
  if (typeof window !== "undefined"){
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/Signin";
    next();
  }
};
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")){
    return JSON.parse(localStorage.getItem("jwt"));
  } 
  else {
    return false;
  }
};
export const SettingAuthenticateToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }else{
    delete axios.defaults.headers.common["Authorization"];
  }
};
