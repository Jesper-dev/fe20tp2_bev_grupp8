import React, { useState } from 'react'
import UserPostCardWrapper from "./UserPostCardElement";

const UserPostCard = ({username, content, timestamp, liked, likeCount, handleChange, checkLiked}) => {



    // const getDate = (number) => {
    //     let date = new Date(number)
    //     let day = date.toLocaleDateString();
    //     return day;
    // }

    return (
        <UserPostCardWrapper>
            <p className="username">{username}</p>
            <p className="content">{content}</p>
            <p className="date">{new Date(timestamp).toLocaleDateString()}</p>
            <input
                type='checkbox'
                checked={checkLiked}
                value={timestamp}
                onChange={(e) => handleChange(e)}
            />
                <i className="fas fa-heart" style={{color: '#c8c8c8'}}></i>

                <span className="likes">{likeCount}</span>

           {/*  </input> */}
        </UserPostCardWrapper>
    )

}

export default UserPostCard
