import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../firebase/context';
import UserInfoCardElement from './UserInfoCardElement';

import UserPostCard from '../profile/profile-wall/user-posts/UserPostCard';

import Backbutton from '../shared/button/back-button/BackButton';
import { GenericVestBtn } from '../shared/button/ButtonElements';

const UserInfoCard = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const [userData, setUserData] = useState();
    const [followed, setFollowed] = useState(false);
    const [uniId, setUniId] = useState('');
    useEffect(() => {
        const usersRef = firebase.users();
        usersRef
            .orderByChild('username')
            .equalTo(id)
            .on('child_added', (snapshot) => {
                const data = snapshot.val();
                setUserData(snapshot.val());
                checkIfFollowed(data.username);
                findUser(data.username);
            });
    }, [firebase, id]); //changed!

    const checkIfFollowed = (username) => {
        firebase
            .user(user.uid)
            .child('/following')
            .once('value', (snapshot) => {
                const data = snapshot.val();
                console.log(data);
                let users = [];

                for (const key in data) {
                    users.push({ ...data[key] });
                }

                for (let i = 0; i < users.length; i++) {
                    if (users[i].username === username) {
                        setFollowed(true);
                        return;
                    } else {
                        setFollowed(false);
                    }
                }
            });
    };

    const followUser = (e, username, email) => {
        console.log(e.target.textContent);
        if (e.target.textContent === 'follow') {
            addUser(username, email);
            addFollowerCount(uniId);
            followerName(uniId, true)
            setFollowed(true);
        } else {
            removeUser(username);
            removeFollowerCount(uniId);
            followerName(uniId, false)
            setFollowed(false);
        }
    };

    const addUser = (username, email) => {
        firebase
            .user(user.uid)
            .child('/following')
            .update({
                [username]: {
                    username,
                    email,
                },
            });
    };

    const removeUser = (username) => {
        firebase.user(user.uid).child(`/following/${username}`).remove();
    };

    const addFollowerCount = (id) => {
        firebase
            .user(id)
            .child('/followerCount')
            .once('value', (snapshot) => {
                let count = snapshot.val();
                let newFollowerCount = (count += 1);
                firebase.user(id).child('/').update({
                    followerCount: newFollowerCount,
                });
            });
    };

    const followerName = (id, add) => {
        if(add === true) {
            firebase
            .user(id)
            .child('/followers')
            .update({
                [user.username]: {
                    username: user.username
                }
            });
        } else {
            firebase
            .user(id)
            .child(`/followers/${user.username}`)
            .remove();
        }

    };

    const removeFollowerCount = (id) => {
        firebase
            .user(id)
            .child('/followerCount')
            .once('value', (snapshot) => {
                let count = snapshot.val();
                let newFollowerCount = (count -= 1);
                firebase.user(id).child('/').update({
                    followerCount: newFollowerCount,
                });
            });
    };

    const findUser = (username) => {
        firebase.users().once('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            let users = [];
            for (const key in data) {
                const obj = {
                    id: key,
                    username: data[key].username,
                };
                users.push(obj);
            }

            let index = users.findIndex((x) => x.username === username);
            console.log(index);
            setUniId(users[index].id);
        });
    };

    return (
        <UserInfoCardElement>
            <Backbutton />
            {userData == null ? (
                <p>Loading user data...</p>
            ) : (
                <>
                    <img src={userData.picture.profile_pic} alt="profile pic" />
                    <h1>{userData.username}</h1>
                    <p>{userData.currency.currency.toLocaleString()}$</p>
                    <p>{userData.email}</p>
                    <p>{userData.bio ? userData.bio : ''}</p>
                    <div className="followerWrapper">
                        <p>
                            Followers:{' '}
                            {userData.followerCount
                                ? userData.followerCount
                                : ''}
                        </p>
                        <GenericVestBtn
                            onClick={(e) =>
                                followUser(e, userData.username, userData.email)
                            }
                            pad="8px"
                            border="1px solid black"
                            br="10px"
                            bg="none"
                            co="black"
                        >
                            {followed ? 'Unfollow' : 'follow'}
                        </GenericVestBtn>
                    </div>
                    {userData.post.posts.length > 0 ? (
                        userData.post.posts.map((postObj, index) => {
                            return (
                                // <div key={index} className="post-card">
                                // 	<p>{postObj.content}</p>
                                // 	<p>Likes: {postObj.likeCount}</p>
                                // 	<p>Liked: {postObj.liked ? "True" : "False"}</p>
                                // 	<p>{new Date(postObj.timestamp).toLocaleDateString()}</p>
                                // </div>
                                <UserPostCard
                                    key={index}
                                    username={postObj.username}
                                    content={postObj.content}
                                    timestamp={postObj.timestamp}
                                    liked={postObj.liked}
                                    likeCount={postObj.likeCount}
                                    /* handleChange={handleChange} */
                                />
                            );
                        })
                    ) : (
                        <p>{userData.username} has not posted anything</p>
                    )}
                </>
            )}
        </UserInfoCardElement>
    );
};

export default UserInfoCard;
