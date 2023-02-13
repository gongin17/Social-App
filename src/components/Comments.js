import React, { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import {
  collection,
  addDoc,
  query,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import "../App.css";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
 

  const getComments = async () => {
    let commentsArray = [];
    const q = query(collection(db, "comments"));
    const comments = await getDocs(q);

    comments.forEach((doc) => {
      commentsArray.push({ id: doc.id, data: doc.data() });
    });
    return commentsArray.filter((c) => c.data.postId === id);
  };

  //const q = query(collection(db, "cities"), where("state", "==", "CA"));


  const fetchComments = async () => {
    const c = await getComments();
    setComments(c);
   
  };

  useEffect(() => {
    fetchComments();
  }, [comments]);
  

  return (
    <ul   className="comments">
      {comments &&
        comments.map((c) => {
          return <li key={c.id} className="comment-item">{c.data.text}</li>;
        })}
    </ul>
  );
};

export default Comments;
