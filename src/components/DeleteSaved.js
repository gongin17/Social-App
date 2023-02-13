import React from "react";
import { db } from "../config/FirebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const DeleteSaved = ({ id }) => {
  const deletePost = (e) => {
    e.preventDefault();

    console.log("savedd post id ", id);
    const docRef = doc(db, "saved", id);

    deleteDoc(docRef)
      .then(() => {
        console.log("delete it");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    
      <button
        type="button"
        className="btn btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdropSaved"
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </button>

      <div
        className="modal fade"
        id="staticBackdropSaved"
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
                {" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">are you sure you want to delete ?</div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel{" "}
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={deletePost}
              >
                Delete{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteSaved;
