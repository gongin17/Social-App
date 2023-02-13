import React, { useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vpassword, setVpassword] = useState("");

  const { signup } = useStateContext();
  const { userid } = useStateContext();

  const navigate =useNavigate(); 

  let userInfo = {
    
    email: email,
    userid: userid,
  };


  const postUserInfo = (e) => {
    e.preventDefault();
    try {
      console.log("user infos ", userInfo);
      const docRef = addDoc(collection(db, "posts"), userInfo);
    
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    postUserInfo()
    if(password===vpassword){
      signup(email, password);
      console.log(signup(email, password));
      navigate('/');
    }
  
  };

  return (
    <div
      className="container mt-1"
      style={{
        border: "1px solid grey",
        width: "400px",
        height: "85vh",
        borderRadius: "9px ",
      }}
    >
      <form onSubmit={handleSubmit} className="p-3 form-floating">
        <div className="fw-bold mx-1">Sign Up</div>

        <div className="my-3 row">
          <input
            type="email"
            id="email"
            className="form-control-sm"
            placeHolder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="mb-3 row">
          <input
            type="password"
            id="password"
            className="form-control-sm"
            placeHolder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="mb-3 row">
          <input
            type="password"
            id="vpassword"
            placeholder="enter password again "
            onChange={(e) => setVpassword(e.target.value)}
            className="form-control-sm"
          ></input>
        </div>

      

        <div className="row">
          <button className="btn btn-secondary">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
