import { useState } from "react"

export const CreateReply = ({ppost, setChange, userID}) => {
    
    const [getReply, setReply] = useState('');

    return (
        <>
        <div>
            <input
                type="text"
                placeholder="Reply here"
                value={getReply}
                onChange={e => setReply(e.target.value)} />
        </div>
        <button onClick={(e) => {
            fetch('http://localhost:81/addReply', 
            {method: 'POST', 
            body: `chName=${ppost.chName}&ppostID=${ppost.postID}&text=${getReply}&userID=${userID}`, 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(response => response.json())
            .then(alert(`Reply created with Parent post ID: ${ppost.postID}, Text: ${getReply} `))
            .catch(error => console.error(error))

            setChange((c) => c + 1);
        }}>Reply</button>
        </>
    )
    
}