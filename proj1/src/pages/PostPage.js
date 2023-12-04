import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { CreateReply } from "../components/CreateReply";
import { ShowPosts } from "../components/ShowPosts";

export const PostPage = (props) => {
    const { slug } = useParams();
    const [getPost, setPost] = useState([]);
    const [getReplies, setReplies] = useState([]);
    const [change, setChange] = useState(0);

    useEffect(() => {
        function fetchPost() {
            fetch('http://localhost:81/getPostWithID', {method: 'POST', body: `postID=${slug}`, 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(response => response.json())
            .then(response => setPost(response)) 
        }
        fetchPost();
    }, [slug]);

    useEffect(() => {
        function fetchReplies() {
            fetch('http://localhost:81/getReplies', {method: 'POST', body: `ppostID=${slug}`, 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(response => response.json())
            .then(response => setReplies(response)) 
        }
        fetchReplies();
    }, [change, slug]);

    return (
        <div className="container">
            <h3>Post: {slug}</h3>
            {getPost.map((item) => (
                <div>
                <Post item={item}></Post>
                <CreateReply ppost={item} setChange={setChange} userID={props.userID}/>
                <h3>Past Replies:</h3>
                <ShowPosts list={getReplies}/>
                </div>)
            )}
        </div>
    )
}