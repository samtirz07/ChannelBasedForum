import React from 'react';
import {useState} from 'react';
import { FileUpload } from './FileUpload';
import axios from 'axios'

export const CreatePost = (props) => {
    const [getTopic, setTopic]  = useState('');
    const [getData, setData]  = useState('');
    //const [getPostID, setPostID] = useState();

    const [getFile, setFile] = useState();
    //const [getImages, setImages] = useState([]);
    //let postID = props.postID;
    
    function handleUpload(postID) {
      console.log(typeof getFile === 'undefined');  // returns true when no file uploaded
      if(typeof getFile !== 'undefined') {
        const formdata = new FormData();
        formdata.append('image', getFile);
        formdata.append('postID', postID);
        axios.post('http://localhost:81/uploadImage', formdata)
        .then(response => {
            if(response.data.Status === "Success") {
                console.log("Succeded");
            }
            else { console.log("Failed"); }
        })
        .catch(error => console.log(error));
      }
      else {
        return;
      }
    }

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
        .then(response => handleUpload(response.postID))
        //.then(response => setPostID(response.postID)) //console.log(response.postID)
        .then(alert(`Post created with Topic: ${getTopic}, Text: ${getData}`))
        .catch(error => console.error(error))
        
        props.setChange((c) => c + 1);
        }
        }>Submit</button>
        
        <FileUpload setFile={setFile}/>
        {/* <button onClick={handleUpload}>Upload</button>
        <button onClick={showPic}>Show</button> */}
        
    </>
    );
}