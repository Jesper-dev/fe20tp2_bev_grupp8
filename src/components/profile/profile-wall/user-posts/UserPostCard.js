import React from 'react'

const UserPostCard = ({username, content, timestamp, likes}) => {
    const getDate = (number) => {
        let date = new Date(number)
        let day = date.toLocaleDateString();
        return day;
    }
    return (
        <div>
            <p>{username}</p>
            <p>{content}</p>
            <p>{getDate(timestamp)}</p>
            <p><i className="fas fa-heart" style={{color: 'lightgrey'}}></i> {likes}</p>
        </div>
    )

}

export default UserPostCard
