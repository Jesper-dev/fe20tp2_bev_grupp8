import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../firebase/context';

import ContentWrapper from '../shared/wrappers/ContentWrapper';
import UserPostCard from '../shared/card/user-post-card/UserPostCard';
import Backbutton from '../shared/button/back-button/BackButton';

import UserInfoCardElement from './UserInfoCardElement';

const UserInfoCard = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);

    const [userPosts, setUserPosts] = useState([]);

    const [countFollow, setCountFollow] = useState(0)
    const [userData, setUserData] = useState();
    const [followed, setFollowed] = useState(false);
    const [uniId, setUniId] = useState('');
    const [userPostsList, setUserPostsList] = useState('');
    const [userFollowerList, setUserFollowerList] = useState('');

    useEffect(() => {
        const usersRef = firebase.users();
        usersRef
            .orderByChild('username')
            .equalTo(id)
            .on('child_added', (snapshot) => {
                const data = snapshot.val();
                setUserData(data);

                let postArray = makePostsList(data.posts);
                let followersArray = makeFollowersArray(data.followers);
                setUserPostsList(postArray);
                setUserFollowerList(postArray);
                checkIfFollowed(data.username);
                findUser(data.username);
                setCountFollow(data.followerCount)
                console.log(snapshot.val());
            });

        firebase.posts().on('value', (snapshot) => {
            const data = snapshot.val();
            let dataArray = [];

			for (const key in data) {
				const obj = {
				  postId: key,
				  postData: data[key]
				};

				dataArray.unshift(obj);
			}

			setUserPosts(dataArray.filter(obj => obj.postData.username.includes(id)));
        });

    }, [firebase, id]);

    const makePostsList = obj => {
        let lists = [];
        for (const key in obj) {
            lists.unshift(obj[key]);
        }
        console.log('Post List: ', lists);
        return lists;
    };

    const makeFollowersArray = obj => {
        let lists = [];
        for (const key in obj) {
            lists.push(obj[key]);
        }
        console.log('Follower List: ', lists);
        return lists;
    };

    const checkIfFollowed = (username) => {
        firebase
            .user(user.uid)
            .child('/following')
            .on('value', (snapshot) => {
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
        if (e.target.textContent.toLowerCase() === 'follow') {
            setCountFollow(countFollow + 1)
            addUser(username, email);
            addFollowerCount(uniId);
            followerName(uniId, true);
            setFollowed(true);
        } else {
            setCountFollow(countFollow - 1)
            removeUser(username);
            removeFollowerCount(uniId);
            followerName(uniId, false);
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
                console.log(count)
                let newFollowerCount = (count += 1);
                firebase.user(id).child('/').update({
                    followerCount: newFollowerCount,
                });
            });
    };

    const followerName = (id, add) => {
        if (add === true) {
            firebase
                .user(id)
                .child('/followers')
                .update({
                    [user.username]: {
                        username: user.username,
                    },
                });
        } else {
            firebase.user(id).child(`/followers/${user.username}`).remove();
        }
    };

    const removeFollowerCount = (id) => {
        firebase
            .user(id)
            .child('/followerCount')
            .once('value', (snapshot) => {
                let count = snapshot.val();
                console.log(count)
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
        <ContentWrapper>
            <UserInfoCardElement>
                <Backbutton />
                {userData == null ? (
                    <p>Loading user data...</p>
                ) : (
                    <>
                    <div className="container">
                        <img src={userData.picture.profile_pic} alt="profile pic" />
                        <div>
                            <h1>
                                {userData.username}{' '}
                                <span>
                                    {userData.emoji ? userData.emoji.emoji : ''}
                                </span>
                            </h1>
                            {userData.organization ? <p>{userData.organization}</p> : ''}
                            <p className="currency">{userData.currency.currency.toLocaleString()}$</p>
                        </div>
                    </div>

                    {id == user.username ? "" :
                    <label>
                        <button onClick={(e) =>
                            followUser(e, userData.username, userData.email)
                        }>{followed ? 'Unfollow' : 'Follow'}</button>
                        <span>
                            {countFollow}
                        </span>
                    </label>}
                        <p>{userData.bio ? userData.bio : ''}</p>
                        <hr/>
                        <h2>Posts</h2>
                        {userPosts.length > 0 ? (
                            userPosts.map((obj, index) => {
                                return (
                                    <UserPostCard
                                        key={index}
                                        postId={obj.postId}
                                        username={obj.postData.username}
                                        content={obj.postData.content}
                                        timestamp={obj.postData.timestamp}
                                        likeCount={obj.postData.likeCount}
                                        liked={obj.postData.likedUsers.includes(user.uid) ? true : false}
                                        picture={obj.postData.picture}
                                    />
                                );
                            })
                        ) : (
                            <p>{userData.username} has not posted anything :/</p>
                        )}
                    </>
                )}
            </UserInfoCardElement>
        </ContentWrapper>
    );
};

export default UserInfoCard;
