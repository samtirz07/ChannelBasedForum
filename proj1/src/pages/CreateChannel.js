import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateChannel = (props) => {

    const navigate = useNavigate();
    const [getName, setName]  = useState('');

    async function onCreateClick () {
        if(getName.length < 1){
            alert("Please enter the new channel's name.");
        }
        else if (await checkChannel()) {
            alert("Channel already exists.");
        }
        else {
        fetch('http://localhost:81/addChannel', 
            {method: 'POST', body: `chName=${getName}&userID=${props.userID}`, 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json())
        .then(alert(`Channel '${getName}' created.`))
        .catch(error => console.error(error))
        }
    }

    async function checkChannel() {
        let result = await fetch('http://localhost:81/channelExists', 
            {method: 'POST', body: `chName=${getName}`, 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json());
        // .catch(error => console.error(error))
        return result.length > 0;
    }

    if(!props.loggedIn) {
        navigate("/");
        return (<></>)
    }
    return(
        <div className="container">
        <h1> Create new channel </h1>
            <div>
            <input
                type="text"
                placeholder="Channel Name"
                value={getName}
                onChange={e => setName(e.target.value)} />
            </div>
    
            <button onClick={(e) => {onCreateClick()}}> Create </button>
        </div>
        );
}