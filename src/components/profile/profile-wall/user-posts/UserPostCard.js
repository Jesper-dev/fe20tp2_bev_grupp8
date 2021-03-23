import React from 'react'
import UserPostCardWrapper from "./UserPostCardElement";

const UserPostCard = ({username, content, timestamp, liked, likeCount, handleChange}) => {
    return (
        <UserPostCardWrapper>
            <p className="username">{username}</p>
            <p className="content">{content}</p>
            <p className="date">{new Date(timestamp).toLocaleDateString()}</p>
            <div>
                <label>
                    <input
                        className="checkbox"
                        type='checkbox'
                        checked={liked}
                        value={timestamp}
                        onChange={handleChange}
                    />
                    <i className="fas fa-heart"></i>
                </label>
                <span className="likes">{likeCount}</span>
            </div>
        </UserPostCardWrapper>
    )
}

export default UserPostCard