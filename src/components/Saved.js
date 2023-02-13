import React, { useState, useEffect } from "react";
import DeleteSaved from './DeleteSaved'
import { db } from "../config/FirebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";
import { useStateContext } from "../context/ContextProvider";

const Saved = () => {

  const [saved, setSaved] = useState([]);
  const { userid } = useStateContext();

 


  const getSaved = async (i) => {
    

    let savedArray = [];

    const savedRef = collection(db, "saved");

    const q = query(savedRef);

    const savedPosts = await getDocs(q);
    savedPosts.forEach((doc) => {
      savedArray.push({ id: doc.id, data: doc.data() });
    });
    console.log("saved array",savedArray)
   return savedArray.filter((c) => c.data.userid === i);
   
  };

  const fetchSavedPosts = async (i) => {
    const p = await getSaved(i);
    setSaved(p);
    console.log(p);
  };

  useEffect(() => {
    fetchSavedPosts(userid);
  }, [userid]);




  return (

     <div className="d-flex flex-wrap justify-content-center  mt-4">
        {saved &&
          saved.map((p) => {
            return (
              <div className="mx-1" key={p.id}>
                <div className="card" style={{ width: "14rem" }}>


                <div className="">
                    {<DeleteSaved id={p.id} /> }
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
 
  )
}

export default Saved