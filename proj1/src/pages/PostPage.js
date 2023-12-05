import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import { CreateReply } from "../components/CreateReply";
import { ShowPosts } from "../components/ShowPosts";

export const PostPage = (props) => {

    const navigate = useNavigate();
    const { slug } = useParams();
    const [getPost, setPost] = useState([]);
    const [getReplies, setReplies] = useState([]);
    const [change, setChange] = useState(0);
    const [getImages, setImages] = useState([]);
    let userID = props.userID;


    useEffect(() => {
        function fetchPost() {
            fetch('http://localhost:81/getPostWithID', {method: 'POST', body: `postID=${slug}`, 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(response => response.json())
            .then(response => setPost(response)) 
        }
        function fetchImages() {
            fetch('http://localhost:81/getImagesOfPost', 
                {method: 'POST', body: `postID=${slug}`, 
                headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(response => response.json())
            .then(response => setImages(response))
            .catch(error => console.error(error))
        }
        fetchPost();
        fetchImages();
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

    const [getLikes, setLikes] = useState(0);
    const [getDislikes, setDislikes] = useState(0);
    const [getMessage, setMessage] = useState('');
    const [userRate, setUserRate] = useState(0); // 0 = no rating, 1 = like, 2 = dislike

    useEffect(() => {
        function fetchUserRating() {
            fetch('http://localhost:81/getRating', {method: 'POST', 
            body: `postID=${slug}&userID=${userID}`, 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(response => response.json())
            .then(response => setUserRate(response.rate))
            .catch(error => console.error(error));
        }
        fetchUserRating();
    }, [slug, userID]);

    function fetchPostLikes() {
        fetch('http://localhost:81/getPostLikesDislikes', {method: 'POST', 
        body: `postID=${slug}&rate=1`, 
        headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json())
        .then(response => setLikes(response.likes))
        .catch(error => console.error(error));
    }
    function fetchPostDislikes() {
        fetch('http://localhost:81/getPostLikesDislikes', {method: 'POST', 
        body: `postID=${slug}&rate=2`, 
        headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json())
        .then(response => setDislikes(response.likes))
        .catch(error => console.error(error));
    }

    setTimeout(fetchPostDislikes(), 1000);
    setTimeout(fetchPostLikes(), 1000);
    


    // useEffect(() => {
    //     function fetchPostLikes() {
    //         fetch('http://localhost:81/getPostLikesDislikes', {method: 'POST', 
    //         body: `postID=${slug}&rate=1`, 
    //         headers: {'Content-type': 'application/x-www-form-urlencoded'}})
    //         .then(response => response.json())
    //         .then(response => setLikes(response.likes))
    //         .catch(error => console.error(error));
    //     }
    //     fetchPostLikes();
    // }, [userRate, slug]);

    // useEffect(() => {
    //     function fetchPostDislikes() {
    //         fetch('http://localhost:81/getPostLikesDislikes', {method: 'POST', 
    //         body: `postID=${slug}&rate=2`, 
    //         headers: {'Content-type': 'application/x-www-form-urlencoded'}})
    //         .then(response => response.json())
    //         .then(response => setDislikes(response.likes))
    //         .catch(error => console.error(error));
    //     }
    //     fetchPostDislikes();
    // }, [userRate, slug]);

    useEffect(() => {
        function createMessage() {
            if(userRate === 0) { setMessage(""); }
            else if(userRate === 1) { setMessage("Liked"); }
            else { setMessage("Disliked"); }
        }
        createMessage();
    }, [userRate, slug]);

    function handleRating(new_rate) {
        if(userRate === new_rate) {
            new_rate = 0;
        }
        fetch('http://localhost:81/setRating', {method: 'POST', 
        body: `postID=${slug}&userID=${userID}&rate=${new_rate}`, 
        headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json())
        .then(setUserRate(new_rate))
        .catch(error => console.error(error));
    }

    if(!props.loggedIn) {
        navigate("/");
        return (<></>)
    }
    return (
        <div className="container">
            <h3>Post: {slug}</h3>
            {getPost.map((item) => (
                <div>
                <Post item={item}></Post>

                <p>{getLikes} </p>
                <button className="like" onClick={(e) => {handleRating(1)}}>
                    <img src="https://cdn-icons-png.flaticon.com/512/2415/2415418.png" alt="buttonpng" border="0"></img>
                </button>
                <p>{getDislikes} </p>
                <button className="dislike" onClick={(e) => {handleRating(2)}}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1633/1633636.png" alt="buttonpng" border="0"></img>
                </button>
                <p>{getMessage}</p>
                <div>
                    {getImages.map((item) => (
                    <img className="landscape" src={`http://localhost:81/images/`+item.img} alt=""></img>
                    ))}
                </div>

                <CreateReply ppost={item} setChange={setChange} userID={props.userID}/>
                <h3>Past Replies:</h3>
                <ShowPosts list={getReplies} userID={props.userID}/>
                </div>)
            )}
        </div>
    )
}