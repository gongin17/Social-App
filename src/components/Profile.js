import React, { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Saved from "./Saved";
import MyPosts from "./MyPosts";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";

const Profile = () => {

  const { userid } = useStateContext();

  const [Clicked, setClicked] = useState(true);
  const [nickname, setNickname] = useState("");
  const [about, setAbout] = useState("");
  const [userDocId, setUserDocId] = useState("");
 


  const getUser = async (id) => {
    
    let userArray = [];

    const userRef = collection(db, "Users");

    const q = query( userRef );

    const users = await getDocs(q);
    users.forEach((doc) => {
      userArray.push({ id: doc.id, data: doc.data() });
    });
    console.log("user array" ,userArray)
    console.log("after filter" ,userArray.filter((c) => c.data.userid === id))
    return userArray.filter((c) => c.data.userid === id);
  };

  const fetchUserProfile = async (i) => {
    console.log("user id" ,i)
    const p =  await  getUser(i);
  
   
  
    setNickname(p[0].data.nickName)
    setAbout(p[0].data.about);
    setUserDocId(p[0].id)
    console.log(p[0].data.about);
  };

  useEffect(  ()=> {
  fetchUserProfile(userid)
    
  }, [userid]);

  return (
    <div className="container ">
      <div className="d-flex  justify-content-center mt-4">
        <div className="m-4">
          <div className="">
           
            <span className="fw-bold mx-2"> {nickname}</span>
            <>
              <button
                type="button"
                className="btn btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </button>

              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">
                    
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Update your profile infos
                      <EditProfile id={userDocId} />
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark"
                        data-bs-dismiss="modal"
                         onClick={()=>console.log("ok",userDocId)}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
          <div className="">{about}</div>
        </div>
      </div>

      <div className="mx-1">
        <button className="btn mx-1 fw-bold"
        style={{ color: Clicked ? "grey" : "" }}
        onClick={() => setClicked(true)}>
          Posts
        </button>
        <button className="btn fw-bold" 
         style={{ color: !Clicked ? "grey" : "" }}
        onClick={() => setClicked(false)}>
          Saved
        </button>
      </div>
      {Clicked ? <MyPosts /> : <Saved />}
    </div>
  );
};

export default Profile;
