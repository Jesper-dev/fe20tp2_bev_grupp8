import React, { useEffect, useState, useContext } from 'react';
import { ChatWrapper, ChatIcon } from './ChatElemens';
import { FirebaseContext } from '../firebase/context';
import ChatCard from './ChatCard';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    // const [yourMsg, setYourMsg] = useState('')
    const [messageId, setMessageId] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const userData = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);

    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        getUserInfo(userData.uid);

        firebase
            .organization(userData.organization)
            .child('/chat')
            .on('value', (snapshot) => {
                const data = snapshot.val();
                let msgList = [];
                for (const key in data) {
                    msgList.push(data[key]);
                }
                setMessages(msgList.reverse());
                setMessageId(msgList.length + 1);
                console.log(msgList);
                console.log(messageId);
            });
        console.log(userInfo);
    }, []);

    const getUserInfo = (id) => {
        firebase.user(id).on('value', (snapshot) => {
            setUserInfo(snapshot.val());
        });
    };

    const onMsgSend = (e, name, pic, text, id) => {
        e.preventDefault();

        if (!text) return;

        firebase
            .organization(userData.organization)
            .child('/chat')
            .update({
                [id]: {
                    name,
                    pic,
                    text,
                },
            });

        setText('');
    };

    return (
        <>
            <ChatIcon onClick={() => setShowChat(!showChat)}>
                <i className="fas fa-comments-dollar"></i>
            </ChatIcon>

            <ChatWrapper showChat={showChat}>
                <section>
                    <h1>Chat within your organization</h1>
                    <div className="chat-wrapper">
                        {messages.map((item, index) => {
                            return (
                                <ChatCard
                                    key={index}
                                    msg={item.text}
                                    pic={item.pic}
                                    yourMsg={
                                        item.name === userInfo.username
                                            ? true
                                            : false
                                    }
                                />
                            );
                        })}
                    </div>
                    <form
                        onSubmit={(e) =>
                            onMsgSend(
                                e,
                                userInfo.username,
                                userInfo.picture.profile_pic,
                                text,
                                messageId
                            )
                        }
                    >
                        {/*            <label>Message: </label> */}
                        {/*   <button>
                            <i className="fas fa-smile"></i>{' '}
                        </button> */}
                        <input
                            placeholder="Message.."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </section>
            </ChatWrapper>
        </>
    );
};

export default Chat;
