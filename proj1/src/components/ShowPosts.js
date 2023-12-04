import React from 'react';
import Post from './Post';

export const ShowPosts = ({list}) => {
    if(list.length < 1) {
        return (
            <>
            <p>*** No Posts ***</p>
            </>
        )
    }
    return (
    <div>
        {list.map((props) => (
        <Post item={props}> </Post>)
        )}
    </div>)
}