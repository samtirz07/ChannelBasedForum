import { useState } from "react"
import axios from 'axios'

export const FileUpload = (props) => {
    const [getFile, setFile] = useState();

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = () => {
        let postID = props.postID;
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

    return (
        <div>
            <input type="file" onChange={handleFile} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}