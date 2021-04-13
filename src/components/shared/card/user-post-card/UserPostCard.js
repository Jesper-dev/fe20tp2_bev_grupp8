import React, { useEffect, useState, useContext } from 'react';
import UserPostCardWrapper from './UserPostCardElement';
import { FirebaseContext } from '../../../firebase/context';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UserPostCard = ({
    postId,
    username,
    content,
    timestamp,
    likeCount,
    liked,
    picture,
}) => {
    const firebase = useContext(FirebaseContext);
    const { id } = useParams();

    const [posts, setPosts] = useState([]);

    const user = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        firebase.posts().on('value', (snapshot) => {
            const data = snapshot.val();
            const entries = Object.entries(data);

            let dataArray = [];

            entries.forEach((entry) => {
                const postId = entry[0];
                const postData = entry[1];

                let newObj = {
                    postId,
                    postData,
                };

                dataArray.push(newObj);
            });

            setPosts(dataArray);
        });
    }, []);

    const handleChange = () => {
        const post = posts.find((post) => post.postId == postId);
        const likedPostIndex = post.postData.likedUsers.findIndex(
            (userId) => userId == user.uid
        );

        console.log(post.postData.userId);
        console.log(user.uid);

        if (likedPostIndex === -1) {
            post.postData.likedUsers.push(user.uid);
        } else {
            post.postData.likedUsers.splice(likedPostIndex, 1);
        }

        post.postData.likeCount = post.postData.likedUsers.length - 1;
        console.log(post.postData.likeCount);
        updateData(post);
    };

    const updateData = (post) => {
        firebase.posts().child(post.postId).update({
            likedUsers: post.postData.likedUsers,
            likeCount: post.postData.likeCount,
        });
    };

    return (
        <UserPostCardWrapper>
            <div>
                <img src={picture ? picture : ''} />
                <h2>{username}</h2>
            </div>
            <p>{content}</p>
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
            {id === username ? (
                ''
            ) : (
                <Link to={`/user/${username}`}>
                    Profile
                    <i className="fas fa-user"></i>
                </Link>
            )}
        </UserPostCardWrapper>
    );
};

export default UserPostCard;
