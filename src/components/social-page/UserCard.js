import React from 'react'

import { UserWrapper } from './UserCardElements'

const UserCard = ({img, username}) => {
    return (
        <UserWrapper>
            <img src={img} alt='pic'/>
            <span>{username}</span>
            <p>Go to account</p>
        </UserWrapper>
    )
}

export default UserCard
