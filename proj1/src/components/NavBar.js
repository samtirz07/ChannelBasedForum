import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = (props) => {

   const navigate = useNavigate();

   function deleteLoginInfo() {
      fetch('http://localhost:81/deleteCookie', {method: 'GET', credentials: 'include',
      headers: {'Content-type': 'application/x-www-form-urlencoded'}})
      .then(function(response) {
         if(response.status === 200) {
             console.log("Delete cookie success.");
         }
         else {
             console.log("Delete cookie failed.");
         }
     })
      .catch(error => console.error(error));
   }

   if(props.userID == 'admin123') {
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
                  <li>
                     <NavLink to="/users">Users</NavLink>
                  </li>
               </ul>
               <h3>User: {props.name}</h3>
               <button className="btn" onClick={() => {
                  props.setUserID('');
                  props.setName('');
                  props.setLoggedIn(false);
                  deleteLoginInfo();
                  navigate("/");}}>
                  Sign out
               </button>
         </div>
         </nav>
         </div>
         );
   }
   
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
                  deleteLoginInfo();
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