import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"


export const Login = ({loggedIn, setLoggedIn, setID, setName}) => {

    const [getUserID, setUserID] = useState('');
    const [getPassword, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        function loginWithCookie(userID, password) {
            fetch('http://localhost:81/loginUser', {method: 'POST', 
            body: `userID=${userID}&password=${password}`, 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(response => response.json())
            .then(function(response) {
                let check = response.length > 0;
                if(check) {
                    response.map((item) => (setName(item.userName)));
                    setID(userID);
                    setLoggedIn(true);
                }
            });
        }

        fetch('http://localhost:81/getCookie', {method: 'GET', credentials: 'include',
        headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json())
        .then(function(response) {
            console.log(response);
            if(response.data !== null) {
                console.log('login with cookie.');
                loginWithCookie(response.data.ID, response.data.password);
            }
        });
      }, []);


    function sendLoginInfo() {
        fetch('http://localhost:81/setCookie', {method: 'POST', credentials: 'include',
        body: `userID=${getUserID}&password=${getPassword}`,
        headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(function(response) {
            if(response.status === 200) {
                console.log("Set cookie success.");
            }
            else {
                console.log("Set cookie failed.");
            }
        })
        // .then(response => response.json())
        // .then(response => console.log("set cookie: " + response))
        .catch(error => console.error(error));
    }

    if(loggedIn) {
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
                response.map((item) => (setName(item.userName)));
                setID(getUserID);
                setLoggedIn(true);
                sendLoginInfo();
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