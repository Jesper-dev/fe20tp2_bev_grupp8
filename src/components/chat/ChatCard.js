import React from 'react'

import { ChatCardWrapper } from './ChatCardElements'

const ChatCard = ({msg, pic, yourMsg}) => {
    return (
        <ChatCardWrapper yourMsg={yourMsg}>
            <img src={pic} />
            <span>{msg}</span>
        </ChatCardWrapper>
    )
}

export default ChatCard
