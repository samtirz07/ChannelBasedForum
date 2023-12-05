// import { useState } from "react"
// import axios from 'axios'

export const FileUpload = (props) => {
    // const [getFile, setFile] = useState();

    const handleFile = (e) => {
        props.setFile(e.target.files[0]);
    }

    return (
        <div>
            <input type="file" onChange={handleFile} />
            {/* <button onClick={handleUpload}>Upload</button> */}
        </div>
    )
}