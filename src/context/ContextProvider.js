import React, { createContext, useContext, useState, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/FirebaseConfig";


const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [userid, setUserid] = useState(null);
  const [user, setUser] = useState( null);

  

   
  useEffect(() => {
  
    if (JSON.parse(localStorage.getItem('USER'))) {
  
      console.log(JSON.parse(localStorage.getItem('USER')).uid)
     setUser(JSON.parse(localStorage.getItem('USER')))
      setUserid(JSON.parse(localStorage.getItem('USER')).uid)
      
      
     
     }
  }, []);

  const signin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password).then(
      ()=>{
        setUserid(JSON.parse(localStorage.getItem('USER')).uid)
        console.log("login successful");
        
      }
    ).catch((err) =>
      console.log(err)
    );
    
  };

  const signup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
      console.log(err)
    );
  };

  const logout = async () => {
    await signOut(auth)
      .then(() => {
     
        console.log("sign out user !!!!");
        
        localStorage.removeItem("USER");
        setUserid(null)
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const authData = {
    signin: signin,
    signup: signup,
    userid: userid,
    logout: logout,
  };

  return (
    <StateContext.Provider value={authData}>{children}</StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
