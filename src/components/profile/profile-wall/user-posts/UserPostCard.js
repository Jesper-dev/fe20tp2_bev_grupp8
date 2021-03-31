import React from 'react'
import UserPostCardWrapper from "./UserPostCardElement";

const UserPostCard = ({username, content, timestamp, liked, likeCount, handleChange}) => {
    return (
        <UserPostCardWrapper>
            <h2>{username}</h2>
            <p>{content}</p>
            <time>{new Date(timestamp).toLocaleDateString()}</time>
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