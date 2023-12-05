import { Link } from 'react-router-dom';
import './Post.css';
    
export const Post = (props) => {
    let noTopic = props.item.topic === null;
    let topicHead = noTopic? <p></p> : <p className ="post-topic">{props.item.topic}</p>

    return (
    <div className="post">
        {/* <p className ="post-topic">{item.topic}</p> */}
        {topicHead}
        <p className ="post-data">{props.item.data}</p>
        <p className ="post-username">by {props.item.userName}</p>
        
        <Link to={"/posts/"+ props.item.postID}>
            <button> View </button>
        </Link>
    </div>
    )
}
export default Post;