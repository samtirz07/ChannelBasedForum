import React from 'react';
import Post from './Post';
import { useState } from 'react';

export const ShowPosts = (props) => {

    const [searchTerm, setSearchTerm] = useState('');

    function handleDeletePost(postID) {
        fetch('http://localhost:81/deletePostReply', {method: 'POST', body: `postID=${postID}`, 
        headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json())
        .then(props.setChange((c) => c+1))
        .catch(error => console.error(error))
    }

    if(props.list.length < 1) {
        return (
            <>
            <p>*** No Posts ***</p>
            </>
        )
    }

    if(props.userID == 'admin123') {
        return (
        <div>
            <input className="searchBar" 
                type="text" 
                placeholder="Search..."
                onChange={(e) => {setSearchTerm(e.target.value)}}/>
            {props.list.filter((item) => {
                if(searchTerm == '') {
                    return item
                }
                else if ((item.topic !== null && item.topic.toLowerCase().includes(searchTerm.toLowerCase())) || 
                item.data.toLowerCase().includes(searchTerm.toLowerCase()) ) {
                    return item
                }
            })
            .map((item) => (
                <div>
                <Post item={item} userID={props.userID}> </Post>
                <button className="del" onClick={(e) => {handleDeletePost(item.postID)}}>Remove</button>
                </div>
            )
            )}
        </div>)
    }

    return (
    <div>
        <input className="searchBar" 
            type="text" 
            placeholder="Search..."
            onChange={(e) => {setSearchTerm(e.target.value)}}/>
        {props.list.filter((item) => {
                if(searchTerm == '') {
                    return item
                }
                else if ((item.topic !== null && item.topic.toLowerCase().includes(searchTerm.toLowerCase())) || 
                item.data.toLowerCase().includes(searchTerm.toLowerCase()) ) {
                    return item
                }
            })
            .map((item) => (
                <div>
                <Post item={item} userID={props.userID}> </Post>
                </div>
            )
            )}
    </div>)
}