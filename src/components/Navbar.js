import React from "react";
import {Link ,useNavigate} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";


const Navbar = () => {

  const {logout}=useStateContext();
  const navigate=useNavigate() 


const handleLogOut=async(e)=>{
    e.preventDefault();
    await logout() ;
    localStorage.removeItem('USER')
    navigate('/')
}

  return (
    <div>
      <nav  className="navbar navbar-expand-md navbar-dark bg-dark text-white ">
        <div  className="container">
          <a  className="navbar-brand" href="#">
            Social app
          </a>
          <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#mainmenu" 
          aria-controls="mainmenu" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          >
       <span className="navbar-toggler-icon"></span>
    </button>
    
          <div  className="collapse navbar-collapse" id="mainmenu">
            <ul  className="navbar-nav ms-auto  ">
              <li  className="nav-item">
                <a  className="nav-link "  href="/create_post">
                  create post
                </a>
              </li>
              <li  className="nav-item">
                <a  className="nav-link" href="/posts">
                  posts
                </a>
              </li>
              <li  className="nav-item">
                <Link  className="nav-link" onClick={handleLogOut}>
                  logout
                </Link>
              </li>
             
          </ul>
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
