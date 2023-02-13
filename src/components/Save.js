import React from "react";
import { db } from "../config/FirebaseConfig";
import {
  collection,
  addDoc,
} from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Save = (data) => {
  console.log("data is :", data);

  let savedPost = {
    fileURL: data.data.fileURL,
    title: data.data.title,
    content: data.data.content,
    like:data.data.like,
    date:data.data.date,
    time:data.data.time,
    userid:data.data.userid
  };

  const savePost = (e) => {
    e.preventDefault();
    try {
      console.log("post infos ", savedPost);
      const docRef = addDoc(collection(db, "saved"), savedPost);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <button className="btn btn-lg bg-light text-dark" onClick={savePost}>
        <FontAwesomeIcon icon={faBookmark}
           
        />
      </button>
    </>
  );
};

export default Save;
