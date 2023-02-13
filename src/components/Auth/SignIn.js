import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signin } = useStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/posts");
    signin(email, password);

    console.log("done");
  };

  return (
    <div
      className="container  mt-3 "
      style={{
        border: "1px solid grey",
        width: "360px",
        height: "80vh",
        borderRadius: "9px",
        boxShadow: " 3px 3px #888888",
      }}
    >
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="mb-3 fw-bold mx-1">Sign In</div>

        <div className="row mb-3 ">
          <div className="col-2 col-sm-1">
            <label htmlFor="email"></label>
          </div>
          <div className="col-10 col-sm-11">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-2 col-sm-1  ">
            <label htmlFor="pwd"></label>
          </div>
          <div className="col-10 col-sm-11">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              id="pwd"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>

            <div className="  my-2 mx-5 " >
              <button className="btn btn-outline-dark " style={{width:"140px"}}>Login</button>
            </div>

            <div className=" m-1 px-3">
              <button
                className="btn btn-large "
                onClick={() => navigate("/signup")}
                style={{ color: "red" }}
              >
                Or create account
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
