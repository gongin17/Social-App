import React, { useState } from "react";
import { doc ,updateDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

const EditProfile = ({ id }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [about, setAbout] = useState("");



  

  const updateProfile = (e) => {
    e.preventDefault();

    console.log("user doc id   ", id);
    const docRef = doc(db, "Users", id);

    updateDoc(docRef, {
      lastName: lastName,
      firstName: firstName,
      nickName: nickName,
      about: about,
    }).then(() => {console.log("updated ")})
  .catch((err) => {console.log(err)});
  };

  return (
    <div
      className="container mt-3"
      style={{
        border: "1px solid grey",
        width: "400px",
        height: "45vh",
        borderRadius: "9px ",
      }}
    >
      <div className="my-3 row px-3">
        <input
          type="text"
          className="form-control-sm "
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
      </div>

      <div className="mb-3 row px-3">
        <input
          type="text"
          className="form-control-sm"
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
        ></input>
      </div>

      <div className="mb-3 row px-3">
        <input
          type="text"
          className="form-control-sm"
          placeholder="about"
          onChange={(e) => setAbout(e.target.value)}
        ></input>
      </div>

      <div className="mb-3 row px-3">
        <input
          type="text"
          placeholder="nick name"
          className="form-control-sm"
          onChange={(e) => setNickName(e.target.value)}
        ></input>
      </div>

      <div className="row px-3">
        <button className="btn btn-secondary" onClick={updateProfile}>Update infos</button>
      </div>
    </div>
  );
};

export default EditProfile;
