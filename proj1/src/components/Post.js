import { Link } from 'react-router-dom';
import './Post.css';
    
export const Post = ({item}) => {
    // add likes, dislikes, and view post
    let noTopic = item.topic === null;
    let topicHead = noTopic? <p></p> : <p className ="post-topic">{item.topic}</p>

    return (
    <div className="post">
        {/* <p className ="post-topic">{item.topic}</p> */}
        {topicHead}
        <p className ="post-data">{item.data}</p>
        <p className ="post-username">by {item.userName}</p>
        
        <Link to={"/posts/"+ item.postID}>
            <button> View </button>
        </Link>

        <button className="like">
            <img src="https://cdn-icons-png.flaticon.com/512/2415/2415418.png" alt="buttonpng" border="0"></img>
        </button>

        <button className="dislike">
            <img src="https://cdn-icons-png.flaticon.com/512/1633/1633636.png" alt="buttonpng" border="0"></img>
        </button>
    </div>
    )
}
export default Post;