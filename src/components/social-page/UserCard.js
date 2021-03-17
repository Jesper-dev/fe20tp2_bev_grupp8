import React from 'react'

import { UserWrapper } from './UserCardElements'

const UserCard = ({img, username, total}) => {
    return (
        <UserWrapper>
            <img src={img} alt='Profilepic'/>
            <div>
                <span>{username}</span>
                <span>{total ? total.toLocaleString() : 0}$</span>
            </div>
            <p onClick={() => console.log("I was just clicked, ouch")}><i className="fas fa-door-open"></i></p>
        </UserWrapper>
    )
}

export default UserCard
