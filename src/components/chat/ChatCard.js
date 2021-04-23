import React from 'react';

import { ChatCardWrapper } from './ChatCardElements';

const ChatCard = ({ msg, pic, yourMsg, date }) => {
    return (
        <ChatCardWrapper yourMsg={yourMsg}>
            {yourMsg ? null : <img src={pic} />}
            <div className="container">
                <span>{msg}</span>
                <time> {new Date(date).toLocaleDateString().slice(5)} - {new Date(date).toLocaleTimeString().slice(0, 5)}</time>
            </div>

        </ChatCardWrapper>
    );
};

export default ChatCard;
