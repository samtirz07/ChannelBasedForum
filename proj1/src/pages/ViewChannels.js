// import { response } from "express";
// import { useLoaderData } from "react-router-dom";

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

// export async function getChannels() {

//     let channel_list;

//     fetch('http://localhost:81/getChannels', {method: 'POST', body: '', 
//     headers: {'Content-type': 'application/x-www-form-urlencoded'}})
//     .then(response => response.json())
//     .then(response => channel_list = response)

//     return channel_list;
// }

export const ViewChannels = () => {
    // let channelList = getChannels();

    // if(channelList.length < 1) {
    //     return (
    //         <i>***No Channels made yet***</i>
    //     )
    // }
    const navigate = useNavigate();
    const [getList, setList] = useState([]);

    useEffect(() => {
        function fetchChannels() {
            fetch('http://localhost:81/getChannels', {method: 'POST', body: '', 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(response => response.json())
            .then(response => setList(response)) 
        }
        fetchChannels();
    }, []);

    if(getList.length < 1) {
        return (
            <div>
            <button className="btn" onClick={() => navigate(-1)}>
            Go Back
			</button>
            <i>***No Channels made yet***</i>
            </div>
        )
    }

    return (
        <div className="container">
            <button className="btn" onClick={() => navigate(-1)}>
            Go Back
			</button>
            <h1>Channels:</h1>
            <ul>
                {getList.map((item) => (
                    <li key={item.chID}>
                        <Link to={"/viewChannels/" + item.chName}>
                        <i>{item.chName}</i>
                        </Link>
                    </li>)
                )}
            </ul>
        </div>
    )

}