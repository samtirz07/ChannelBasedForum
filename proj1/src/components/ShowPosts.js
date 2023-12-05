import React from 'react';
import Post from './Post';

export const ShowPosts = (props) => {
    if(props.list.length < 1) {
        return (
            <>
            <p>*** No Posts ***</p>
            </>
        )
    }
    return (
    <div>
        {props.list.map((item) => (
        <Post item={item} userID={props.userID}> </Post>)
        )}
    </div>)
}