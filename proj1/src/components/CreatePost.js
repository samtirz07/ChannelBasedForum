import React from 'react';
import {useState} from 'react';

export const CreatePost = (props) => {
    //{chName, setChange}
    const [getTopic, setTopic]  = useState('');
    const [getData, setData]  = useState('');

    return(
    <>
    <h3> Create a Post </h3>
        <div>
        <input
            type="text"
            placeholder="Topic"
            value={getTopic}
            onChange={e => setTopic(e.target.value)} />
        </div>
        <div>
            <input
                type="text"
                placeholder="Text"
                value={getData}
                onChange={e => setData(e.target.value)} />
        </div>

        <button onClick={(e) => {

        fetch('http://localhost:81/addPost', {method: 'POST', 
            body: `chName=${props.chName}&topic=${getTopic}&text=${getData}&userID=${props.userID}`, 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json())
        // .then(function(response) {
        //     let postID = response.data.postID;
        //     alert('Post created with ID: ' + postID);
        //     return response;
        // })
        .then(alert(`Post created with Topic: ${getTopic}, Text: ${getData}`))
        .catch(error => console.error(error))
        
        props.setChange((c) => c + 1);
        }
        }>Submit</button>
    </>
    );
}