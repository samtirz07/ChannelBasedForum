
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ShowPosts } from "../components/ShowPosts";
import { CreatePost } from "../components/CreatePost";


export const Channel = (props) => {

    const { slug } = useParams();
    const [getPosts, setPosts] = useState([]);
    const [getChange, setChange] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        function fetchPosts() {
            fetch('http://localhost:81/readPosts', {method: 'POST', body: `chName=${slug}`, 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(response => response.json())
            .then(response => setPosts(response)) 
        }
        fetchPosts();
    }, [getChange, slug]); //getChange

    return (
        <div className="container">
            <button className="btn" onClick={() => navigate(-1)}>
            Go Back
			</button>
            <h3>{slug}</h3>
            <p>Posts here...</p>
            <ShowPosts list={getPosts} />
            <CreatePost chName={slug} setChange={setChange} userID={props.userID}/>
        </div>
    )
}