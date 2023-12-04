import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import '../index.css';


export const NavBar = (props) => {

   const navigate = useNavigate();
   
   if(props.loggedIn) {
      return (
         <div>
         <nav>
         <div className="nav-items container">
               <ul>
                  <li>
                     <NavLink to="/">Landing</NavLink>
                  </li>
                  <li>
                     <NavLink to="/viewChannels">View Channels</NavLink>
                  </li>
                  <li>
                     <NavLink to="/createChannel">Create new channel</NavLink>
                  </li>
               </ul>
               <h3>User: {props.name}</h3>
               <button className="btn" onClick={() => {
                  props.setUserID('');
                  props.setName('');
                  props.setLoggedIn(false);
                  navigate("/");}}>
                  Sign out
               </button>
         </div>
         </nav>
         </div>
         );
    }

    return (
      <div>
      <nav>
      <div className="nav-items container">
            <ul>
               <li>
                  <NavLink to="/">Landing</NavLink>
               </li>
               <li>
                  <NavLink to="/login">Log in</NavLink>
               </li>
               <li>
                  <NavLink to="/signUp">Sign Up</NavLink>
               </li>
            </ul>
      </div>
      </nav>
      </div>
      );
    
};