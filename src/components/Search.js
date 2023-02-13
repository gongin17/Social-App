import React, { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Search = () => {
  const [keyword, setKeyword] = useState([]);
  const [result, setResult] = useState(undefined);

  const [posts, setPosts] = useState(null);

  const [users, setUsers] = useState([]);

  const getPosts = async () => {
    let postsArray = [];
    const q = query(collection(db, "posts"));
    const posts = await getDocs(q);

    posts.forEach((doc) => {
      postsArray.push({ id: doc.id, data: doc.data() });
    });
    return postsArray;
  };

  const fetchData = async () => {
    const p = await getPosts();
    setPosts(p);
    console.log(p);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const search = (k) => {
    const rs = posts.filter((x) => x.data.title === k);
    console.log(rs);

    setResult(rs);
  };

  return (
    <div className="container mt-3 ">
      <p className="fw-bold">Search</p>

      <div className="d-flex justify-content-center">
        <div className="">
          <input
            type="text"
            className="form-control"
            placeholder="Search "
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="mx-1">
          <button className="btn btn-dark" onClick={() => search(keyword)}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <div className="bg-light text-dark">
        <div className="d-flex flex-wrap justify-content-center">
          {result &&
            result.map((x) => {
              return (
                <div className="" key={x.id}>
                  {x.data.title}
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Search;
