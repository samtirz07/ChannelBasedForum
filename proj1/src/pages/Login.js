// import { response } from "express";
import { useState } from "react";
import { useNavigate } from "react-router-dom"


export const Login = (props) => {

    const [getUserID, setUserID] = useState('');
    const [getPassword, setPassword] = useState('');
    //const [getLoginStatus, setLoginStatus] = useState(false);
    const navigate = useNavigate();

    if(props.loggedIn) {
        navigate("/");
        return (
            <></>
        )
    }
    return (
        <div className="container">
        <h3> Sign in </h3>
        <div>
        <input
            type="text"
            placeholder="User ID"
            value={getUserID}
            onChange={e => setUserID(e.target.value)} />
        </div>
        <div>
        <input
            type="text"
            placeholder="Password"
            value={getPassword}
            onChange={e => setPassword(e.target.value)} />
        </div>

        <button onClick={(e) => {

        fetch('http://localhost:81/loginUser', {method: 'POST', body: `userID=${getUserID}&password=${getPassword}`, 
        headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json())
        .then(function(response) {
            let check = response.length > 0;
            if(check) {
                response.map((item) => (props.setName(item.userName)));
                props.setID(getUserID);
                props.setLoggedIn(true);
                alert("Login success!");
                //navigate("/");
            }
            else {
                alert("User ID and password mismatch.");
            }
        })
        
        }
        }>Login</button>
        </div>
      )

}