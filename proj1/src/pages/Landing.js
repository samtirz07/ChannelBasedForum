// import { FileUpload } from "../components/FileUpload"
// import { useState } from "react";
// import axios from 'axios'

export const Landing = (props) => {
    let message = props.loggedIn ? <h1>Welcome {props.name}!</h1> : <h1>Welcome to the message board! Please log in to proceed...</h1>

    return (
      <div className="container">
        {message}

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