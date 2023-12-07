import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export const Users = ({userID, loggedIn}) => {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [getUserList, setUserList] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        function fetchUsers() {
            fetch('http://localhost:81/getAllUsers', {method: 'POST', body: '', 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(response => response.json())
            .then(response => setUserList(response)) 
        }
        fetchUsers();
    }, [count]);

    async function handleDeleteUser(userID) {
        await fetch('http://localhost:81/deleteUser', {method: 'POST', body: `userID=${userID}`, 
        headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json())
        .then(setCount((c)=> c+1))
        .catch(error => console.error(error))
    }

    if(userID != 'admin123') {
        navigate("/");
        return (<></>)
    }

    return (
        <div className="container">
            <button className="btn" onClick={() => navigate(-1)}>
            Go Back
            </button>
            <h3>Users:</h3>
            <input className="searchBar" 
                type="text" 
                placeholder="Search..."
                onChange={(e) => {setSearchTerm(e.target.value)}}/>
            <ul>
                {getUserList.filter((item) => {
                    if(searchTerm == '') {
                        return item
                    }
                    else if (item.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    item.userID.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return item
                    }
                })
                .map((item) => { 
                    return (
                    <li key={item.userID}>
                        <p>ID: {item.userID}, Name: {item.userName}</p>
                        <button className="del" onClick={(e) => {handleDeleteUser(item.userID)}}>Remove</button>
                    </li>
                    )}
                )}
            </ul>
        </div>
    )

}