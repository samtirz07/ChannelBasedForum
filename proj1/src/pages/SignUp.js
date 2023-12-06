import { useState } from "react";
import { useNavigate } from "react-router-dom"


export const SignUp = ({loggedIn}) => {

    const [getUserID, setUserID] = useState('');
    const [getUserName, setUsername] = useState('');
    const [getPassword, setPassword] = useState('');

    async function userExists() {
      let result = await fetch('http://localhost:81/getUser', {method: 'POST', body: `userID=${getUserID}`, 
          headers: {'Content-type': 'application/x-www-form-urlencoded'}})
      .then(response => response.json());
      return result.length > 0;
    }
    
    async function onButtonClick() {
      let validChars = /^[a-zA-Z0-9_.]+$/;
      let passInvalidChar = / /;
      if(getUserID === "") {
        alert("Please enter user ID.");
        return;
      }
      else if(!validChars.test(getUserID)) {
        alert("User ID can only have alphanumeric and the special characters: '_' and '.'");
        return;
      }
      else if(getPassword.length < 6) {
        alert("Password needs to be atleast 6 characters long.");
        return;
      }
      else if(passInvalidChar.test(getPassword)) {
        alert("Password cannot have a space.");
        return;
      }
      else if(await userExists()) {
        alert("User ID is taken.");
        return;
      }
      else if(getUserName === "") {
        alert("Please enter name.");
        return;
      }
      else {
        fetch('http://localhost:81/createUser', {method: 'POST', body: `userID=${getUserID}&userName=${getUserName}&password=${getPassword}`, 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json())
        .then(alert(`User created with user ID: ${getUserID}, name: ${getUserName}`))
        .catch(error => console.error(error))
        return;
      }
    }
    
    const navigate = useNavigate();

    if(loggedIn) {
      navigate("/");
      return (
          <></>
      )
    }

    return (
      <div className="container">
        <h3> Sign Up </h3>
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
        <div>
        <input
            type="text"
            placeholder="Name"
            value={getUserName}
            onChange={e => setUsername(e.target.value)} />
        </div>

        <button onClick={(e) => {onButtonClick()}}>Create account</button>
      </div>
    )

}
