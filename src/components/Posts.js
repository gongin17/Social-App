import React, { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import Like from "./Like";
import Comments from "./Comments";
import Save from "./Save";
import Delete from "./Delete";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../context/ContextProvider";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [text, setText] = useState("");
  const [postId, setPostId] = useState("");

  const { userid } = useStateContext();

  let comment = {
    text: text,
    postId: postId,
  };

  const postComment = (e) => {
    e.preventDefault();
    try {
      console.log("comment infos ", comment);
      const docRef = addDoc(collection(db, "comments"), comment);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getPosts = async () => {
    let postsArray = [];
    const q = query(collection(db, "posts"));
    const posts = await getDocs(q);

    posts.forEach((doc) => {
      postsArray.push({ id: doc.id, data: doc.data() });
    });
    return postsArray;
  };

  const fetchPosts = async () => {
    const p = await getPosts();
    setPosts(p);
    // console.log(p)
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <div className="">
        {posts.map((doc) => {
          return (
            <div className="d-flex justify-content-center  mb-4 " key={doc.id}>
              <div className="card " style={{ width: "25rem" }}>
                <div className="d-flex justify-content-between">
                  <div className="">
                    <button className="btn btn-lg ">
                      <FontAwesomeIcon icon={faCircleExclamation} />
                    </button>
                  </div>

                  <div className="">
                    {doc.data.userid === userid ? <Delete id={doc.id} /> : ""}
                  </div>
                </div>

                <img
                  src={doc.data.fileURL}
                  className="card-img-top"
                  alt="..."
                ></img>
                <div className="card-body">
                  <div className="card-text">{doc.data.content}</div>

                  <div className="d-flex justify-content-between">
                    <div className="">
                      {doc.data.likes}
                      <Like id={doc.id} like={doc.data.like} />

                      <button
                        className="btn btn-lg bg-light  "
                        onClick={() => console.log("comments")}
                      >
                        <FontAwesomeIcon icon={faComment} />
                      </button>
                      <button
                        className="btn btn-lg bg-light  "
                        onClick={() => console.log("share")}
                      >
                        <FontAwesomeIcon icon={faShare} />
                      </button>
                    </div>
                    <div className="">
                      <Save {...doc} />
                    </div>
                  </div>
                  <div className="">
                    <div className="d-flex justify-content-start">
                      <div className="pt-1">
                        <input
                          type="text"
                          placeholder=" write a comment"
                          className="form-controll-small "
                          onChange={(e) => {
                            setText(e.target.value);
                            setPostId(doc.id);
                          }}
                        />
                      </div>
                      <div className="mx-2">
                        <button
                          className="btn btn-dark rounded-pill  "
                          onClick={postComment}
                        >
                          post
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <Comments id={doc.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
