import { useState } from "react"
import { FileUpload } from './FileUpload';
import axios from 'axios'

export const CreateReply = ({ppost, setChange, userID}) => {
    
    const [getReply, setReply] = useState('');
    const [getFile, setFile] = useState();
    
    async function handleReplyClick() {
      await fetch('http://localhost:81/addReply', 
          {method: 'POST', 
          body: `chName=${ppost.chName}&ppostID=${ppost.postID}&text=${getReply}&userID=${userID}`, 
          headers: {'Content-type': 'application/x-www-form-urlencoded'}})
          .then(response => response.json())
          .then(response => handleUpload(response.postID))
          // .then(alert(`Reply created with Parent post ID: ${ppost.postID}, Text: ${getReply} `))
          .catch(error => console.error(error));
    }
    
    async function handleUpload(postID) {
      console.log(typeof getFile === 'undefined');  // returns true when no file uploaded
      if(typeof getFile !== 'undefined') {
        const formdata = new FormData();
        formdata.append('image', getFile);
        formdata.append('postID', postID);
        await axios.post('http://localhost:81/uploadImage', formdata)
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

    return (
        <>
        <div>
            <input
                type="text"
                placeholder="Reply here"
                value={getReply}
                onChange={e => setReply(e.target.value)} />
        </div>
        <button onClick={(e) => {
            handleReplyClick();
            setChange((c) => c + 1);

        }}>Reply</button>
        <FileUpload setFile={setFile}/>
        </>
    )
    
}