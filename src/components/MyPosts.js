import React, { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";
import Delete from "./Delete";

import { useStateContext } from "../context/ContextProvider";

const MyPosts = () => {
  const [PostsOfUser, setPostsOfUser] = useState([]);
  const { userid } = useStateContext();
  const getPosts = async (i) => {
    
   
    

    let myPostsArray = [];

    const myPostsRef = collection(db, "posts");

    const q = query(myPostsRef);

    const myPosts = await getDocs(q);
    myPosts.forEach((doc) => {
      myPostsArray.push({ id: doc.id, data: doc.data() });
    });
    console.log("myPost array" ,myPostsArray)
    return myPostsArray.filter((c) => c.data.userid === i);
  };

  const fetchPosts = async (i) => {
    const p = await getPosts(i);
    setPostsOfUser(p);
    console.log(p);
  };

  useEffect(() => {
    fetchPosts(userid);
  }, [userid]);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center  mt-4">
        {PostsOfUser &&
          PostsOfUser.map((p) => {
            return (
              <div className="mx-1" key={p.id}>
                
                <div className="card" style={{ width: "14rem" }}>

                <div className="">
                    {<Delete id={p.id} /> }
                  </div>

                  <img src={p.data.fileURL} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <p className="card-text"></p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MyPosts;
