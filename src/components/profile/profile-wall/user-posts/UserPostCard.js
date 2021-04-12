import React, { useEffect, useState, useContext } from 'react';
import UserPostCardWrapper from './UserPostCardElement';
import { FirebaseContext } from '../../../firebase/context';

const UserPostCard = ({
    uid, // postId
    username,
    content,
    timestamp,
    likeCount,
    liked,
    picture,
}) => {
    const firebase = useContext(FirebaseContext);

    const [posts, setPosts] = useState([]);

    const userData = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        firebase.posts().on('value', (snapshot) => {
            const data = snapshot.val();
            // console.log(Object.values(data));
            setPosts(Object.values(data));
        });
    }, []);

    const handleChange = () => {
        const post = posts.find((post) => post.uid == uid);
        const likedPostIndex = post.likedUsers.findIndex(
            (user) => user === userData.uid
        );

        if (likedPostIndex === -1) {
            post.likedUsers.push(userData.uid);
            post.likeCount++;
        } else {
            post.likedUsers.splice(likedPostIndex, 1);
            post.likeCount--;
        }

        updateData(post);
    };

    const updateData = (posts) => {
        firebase.posts().child(uid).update(posts);
    };

    return (
        <UserPostCardWrapper>
            <h2>{username}</h2>
            <p>{content}</p>
            <img src={picture ? picture : ''} />
            <time>{new Date(timestamp).toLocaleDateString()}</time>
            <div>
                <label>
                    <input
                        className="checkbox"
                        type="checkbox"
                        checked={liked}
                        onChange={handleChange}
                    />
                    <i className="fas fa-heart"></i>
                </label>
                <span className="likes">{likeCount}</span>
            </div>
        </UserPostCardWrapper>
    );
};

export default UserPostCard;
