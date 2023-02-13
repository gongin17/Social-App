import React, { useState, useEffect } from "react";
import { storage } from "../config/FirebaseConfig";
import { db } from "../config/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const CreatePost = () => {
  const [percent, setPercent] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState("");

  const { userid } = useStateContext();
  console.log("user id", userid);

  let today = new Date();

  let datePost =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let timePost = today.getHours + ":" + today.getMinutes;

  let post = {
    fileURL: fileURL,
    title: title,
    content: content,
    like: false,
    date: datePost,
    time: timePost,
    userid: userid,
  };

  const navigate = useNavigate();

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFileURL(url);
          console.log("uploaded successfully ", url);
        });
      }
    );
  };

  const postInfo = (e) => {
    e.preventDefault();
    try {
      console.log("post infos ", post);
      const docRef = addDoc(collection(db, "posts"), post);
      console.log("Document written with ID: ", docRef.id);
      navigate("/posts");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    handleUpload();
  };

  return (
    <div
      className="container mt-3 "
      style={{
        width: "350px",
        height: "75vh",
        borderRadius: "9px",
        border: "1px solid grey",
      }}
    >
      <form className="m-3">
        <div className="my-4 fw-bold">New post</div>

        <div className="row mb-3">
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            placeholder="title"
            className="form-control-sm"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>

        <div className="row  mb-3">
          <label htmlFor="content"></label>
          <input
            type="text"
            id="content"
            placeholder="content"
            className="form-control-sm"
            onChange={(e) => setContent(e.target.value)}
          ></input>
        </div>
        <div className="row mb-3">
          <input
            type="file"
            id="cover"
            className="form-control-sm"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
        </div>
        <div className="row mb-3">
          {file && (
              <div className="progress">
              <div className="progress-bar progress-bar-info progress-bar-striped">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={percent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: percent + "%" }}
                >
                  {percent}%
                </div>
              </div>
            </div>

          )}
         

          <div className="d-flex justify-content-center ">
            <button
              className="btn btn-dark form-control-sm m-2"
              onClick={postInfo}
            >
              Post
            </button>
            <button
              className="btn btn-secondary form-control-sm  m-2"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
