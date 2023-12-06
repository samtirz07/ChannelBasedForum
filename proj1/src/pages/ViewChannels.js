import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export const ViewChannels = (props) => {
    
    const navigate = useNavigate();
    const [getList, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [count, setCount] = useState(0);

    function handleDelete(chName) {
        fetch('http://localhost:81/deleteChannel', {method: 'POST', body: `chName=${chName}`, 
        headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json())
        .then(setCount((c)=> c+1))
        .catch(error => console.error(error))
    }

    useEffect(() => {
        function fetchChannels() {
            fetch('http://localhost:81/getChannels', {method: 'POST', body: '', 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(response => response.json())
            .then(response => setList(response)) 
        }
        fetchChannels();
    }, [count]);


    if(!props.loggedIn) {
        navigate("/");
        return (<></>)
    }

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
    
    if(props.userID == 'admin123') {
        console.log("Admin here.");
        return (
            <div className="container">
                <button className="btn" onClick={() => navigate(-1)}>
                Go Back
                </button>
                <h1>Channels:</h1>
                <input className="searchBar" 
                    type="text" 
                    placeholder="Search..."
                    onChange={(e) => {setSearchTerm(e.target.value)}}/>
                <ul>
                    {getList.filter((item) => {
                        if(searchTerm == '') {
                            return item
                        }
                        else if (item.chName.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return item
                        }
                    })
                    .map((item) => { 
                        return (
                        <li key={item.chName}>
                            <Link to={"/viewChannels/" + item.chName}>
                            <i>{item.chName}</i>
                            </Link>
                            <button className="del" onClick={(e) => {handleDelete(item.chName)}}>Remove</button>
                        </li>
                        )}
                    )}
                </ul>
            </div>
        )
    }
    return (
        <div className="container">
            <button className="btn" onClick={() => navigate(-1)}>
            Go Back
            </button>
            <h1>Channels:</h1>
            <input className="searchBar" 
                type="text" 
                placeholder="Search..."
                onChange={(e) => {setSearchTerm(e.target.value)}}/>
            <ul>
                {getList.filter((item) => {
                    if(searchTerm == '') {
                        return item
                    }
                    else if (item.chName.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return item
                    }
                })
                .map((item) => { 
                    return (
                    <li key={item.chID}>
                        <Link to={"/viewChannels/" + item.chName}>
                        <i>{item.chName}</i>
                        </Link>
                    </li>
                    )}
                )}
            </ul>
        </div>
    )
    
}