import React, { useState } from 'react'
import UserPostCardWrapper from "./UserPostCardElement";

const UserPostCard = ({username, content, timestamp, likes, handleChange, checkLiked}) => {



    const getDate = (number) => {
        let date = new Date(number)
        let day = date.toLocaleDateString();
        return day;
    }
    return (
        <UserPostCardWrapper>
            <p className="username">{username}</p>
            <p className="content">{content}</p>
            <p className="date">{getDate(timestamp)}</p>
            <input
                type='checkbox'
                checked={checkLiked}
                onChange={(e) => handleChange(likes)}
                />
                <i className="fas fa-heart" style={{color: '#c8c8c8'}}></i>

                <span className="likes">{likes}</span>

           {/*  </input> */}
        </UserPostCardWrapper>
    )

}

export default UserPostCard
