import React, { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSearch,
  faSquarePlus,
  faUser,
  faHome,
  faBookmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const LeftSide = () => {
  const [clicked, setClicked] = useState(false);

  const { logout } = useStateContext();
  const navigate = useNavigate();

  const handleLogOut =  (e) => {
    e.preventDefault();
     logout();
     navigate("/signin");
   
   
  };

  return (
    <div className=" ">
      <ul className="menu " style={{ width: !clicked ? "75px" : "" }}>
        <div className="menu-item">
          <a
            className=""
            onClick={() => {
              setClicked(clicked ? false : true);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </a>
          <div className="fw-bold  px-3 "> {clicked && <>Social App</>}</div>
        </div>

        <li className="menu-item  ">
          <a href="/posts">
            <FontAwesomeIcon icon={faHome} /> {clicked && <>Home </>}
          </a>
        </li>
        <li className="menu-item  ">
          <a href="/search">
            <FontAwesomeIcon icon={faSearch} /> {clicked && <>Search </>}
          </a>
        </li>
        <li className="menu-item  ">
          <a href="/notification">
            <FontAwesomeIcon icon={faHeart} /> {clicked && <>Notification </>}
          </a>
        </li>
        <li className="menu-item  ">
          <a href="/create_post">
            <FontAwesomeIcon icon={faSquarePlus} /> {clicked && <>Create </>}
          </a>
        </li>
        <li className="menu-item ">
          <a href="/profile">
            <FontAwesomeIcon icon={faUser} /> {clicked && <>Profile </>}
          </a>
        </li>

        <li className="menu-item ">
          <a href="/saved">
            <FontAwesomeIcon icon={faBookmark} /> {clicked && <>Saved </>}
          </a>
        </li>

        <li className="menu-item ">
          <Link className="nav-link" onClick={handleLogOut}>
            {clicked && <>Logout </>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftSide;
