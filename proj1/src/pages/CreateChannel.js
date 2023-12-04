import React from 'react';
import {useState} from 'react';

export const CreateChannel = (props) => {

    const [getName, setName]  = useState('');
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
    
            <button onClick={(e) => {

                if(getName.length < 1){
                    alert("Please enter the new channel's name.");
                }
                else {
                fetch('http://localhost:81/addChannel', 
                    {method: 'POST', body: `chName=${getName}&userID=${props.userID}`, 
                    headers: {'Content-type': 'application/x-www-form-urlencoded'}})
                .then(response => response.json())
                .then(alert(`Channel Name: ${getName}`))
                .catch(error => console.error(error))
                }
            } 
            }> Create </button>
        </div>
        );
}