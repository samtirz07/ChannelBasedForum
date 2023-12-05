// import { FileUpload } from "../components/FileUpload"
// import { useState } from "react";
// import axios from 'axios'

export const Landing = () => {
  //props

    // const [getFile, setFile] = useState();
    // const [getImages, setImages] = useState([]);
    // let postID = props.postID;
    
    // const handleUpload = () => {
    //   console.log(typeof getFile === 'undefined');  // returns true when no file uploaded
    //   if(typeof getFile !== 'undefined') {
    //     const formdata = new FormData();
    //     formdata.append('image', getFile);
    //     formdata.append('postID', postID);
    //     axios.post('http://localhost:81/uploadImage', formdata)
    //     .then(response => {
    //         if(response.data.Status === "Success") {
    //             console.log("Succeded");
    //         }
    //         else { console.log("Failed"); }
    //     })
    //     .catch(error => console.log(error));
    //   }
    // }

    // const showPic = () => {
    //   fetch('http://localhost:81/getImagesOfPost', 
    //       {method: 'POST', body: `postID=${props.postID}`, 
    //       headers: {'Content-type': 'application/x-www-form-urlencoded'}})
    //   .then(response => response.json())
    //   .then(response => setImages(response))
    //   .catch(error => console.error(error))
    // }

    return (
      <div className="container">
        <h1> Welcome! </h1>
        {/* <FileUpload setFile={setFile}/>
        <button onClick={handleUpload}>Upload</button>
        <button onClick={showPic}>Show</button>
        <div>
          {getImages.map((item) => (
            <img className="landscape" src={`http://localhost:81/images/`+item.img} alt=""></img>
          ))}
        </div> */}

      </div>
    )

}