import React ,{useEffect} from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Notifications from "./components/Notification";
import LeftSide from "./components/LeftSide";
import Saved from "./components/Saved";
import EditProfile from "./components/EditProfile";

import { useStateContext } from "./context/ContextProvider";

function App() {
   
  const { userid } = useStateContext();
    
  console.log("user id",userid)



  return (
    <div className="App ">
      <div className="row mt-2">
        <div className="col-md-2 col-lg-2 ">
         
        {userid===null  ? "" : <LeftSide />}
        </div>
        <div className="col-md-8 col-lg-8">
          <Routes>
            <Route path="/signin" element={userid===null ?<SignIn /> :<Posts />} />
            <Route path="/signup" element={userid===null ?<SignUp />:<Posts />} />
            <Route path="/" element={userid===null ?<SignIn />:<Posts />} />
            <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />

            <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/notification" element={<PrivateRoute><Notifications /></PrivateRoute>} />
            <Route path="/saved" element={<PrivateRoute><Saved /></PrivateRoute>} />
            <Route path="/edit_profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
            <Route
              path="/create_post"
              element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              }
            />
            </Routes>
           
        </div>
      </div>
    </div>
  );
}

export default App;
