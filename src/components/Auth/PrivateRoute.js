import React ,{useEffect} from "react";
import { Navigate ,Outlet  } from "react-router-dom";
import { auth } from "../../config/FirebaseConfig";

const PrivateRoute = ({ children }) => {
  
let user =auth.currentUser

  

  useEffect(() => {
  
     if (user != null) {


      console.log("user",user.uid) 
      localStorage.setItem("USER", JSON.stringify(user));
      console.log("user",user.email)
  
    }
  }, []);

  return localStorage.getItem("USER") != null ? children : <Navigate to="/" />;
};



export default PrivateRoute;