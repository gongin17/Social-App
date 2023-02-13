import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faRedo } from "@fortawesome/free-solid-svg-icons";
import { db } from "../config/FirebaseConfig";
import {
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";

const Like = ({ id, like }) => {
  const [likeValue, setLikeValue] = useState(() => !like);

  const likePost = (e) => {
    e.preventDefault();

    setLikeValue(!likeValue);
    console.log("post id for like  ", id);
    console.log(" like  ", likeValue);
    const docRef = doc(db, "posts", id);

    updateDoc(docRef, {
      like: likeValue,
      likes: likeValue ? increment(1) : increment(-1),
    }).then(() => {});
  };

  return (
    <>
      <button className="btn btn-lg  " onClick={likePost}>
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: !likeValue ? "red" : "" }}
        />
      </button>
    </>
  );
};

export default Like;
