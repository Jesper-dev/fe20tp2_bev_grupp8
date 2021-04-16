import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../firebase/context';
import { ContentWrapper } from './SocialPostElements';
import * as ROUTES from "../../constants/routes";
import {Link} from "react-router-dom";
// import 'firebase/database';
// import { withAuthorization } from '../session';

const SocialPost = () => {
    const firebase = useContext(FirebaseContext);
    const [postData, setPostData] = useState('');
    const [postInOrg, setPostInOrg] = useState(false);

    const userData = JSON.parse(localStorage.getItem('authUser'));

    const writeNewPost = (uid, username, picture, postData) => {
        // A post entry.
        var postData = {
            userId: uid,
            username: username,
            content: postData,
            likeCount: 0,
            likedUsers: [''],
            timestamp: Date.now(),
            picture: picture,
        };

        // Get a key for a new Post.
        let newPostKey = firebase.post(uid).child('posts').push().key;
        /*     var newPostKey = firebase.db().ref('posts').push().key; */

        // Write the new post's data simultaneously in the posts list and the user's post list.
        let updates = {};
        let updatesUser = {};
        updates[newPostKey] = postData;
        updatesUser[uid + '/posts/' + newPostKey] = postData;

        firebase.users().update(updatesUser);
        return firebase.posts().update(updates);
    };

    const addToRecentPost = (uid, username, picture, postData) => {
        firebase
            .user(uid)
            .child('/recentPost/')
            .set({
                postData: {
                    username: username,
                    content: postData,
                    likeCount: 0,
                    liked: false,
                    timestamp: Date.now(),
                    uid: uid,
                    picture: picture,
                },
            });
    };

    const onChangeText = (evt) => {
        setPostData(evt.target.value);

        if (evt.target.value.length > 0) {
            evt.target.classList.add('not-empty');
        } else {
            evt.target.classList.remove('not-empty');
        }
    };

    const updateData = (posts) => {
        firebase.user(`${userData.uid}/post`).set({
            posts,
        });
    };

    const postInOrgFunc = (org, uid, username, picture, postData) => {
        firebase
            .organization(org)
            .child('/recentlyPosted/')
            .set({
                postData: {
                    username: username,
                    content: postData,
                    likeCount: 0,
                    liked: false,
                    timestamp: Date.now(),
                    uid: uid,
                    picture: picture,
                },
            });
    };

    const handleSubmitPost = (e) => {
        e.preventDefault();
        let profilePic;


        const profilePicObj = firebase.user(
            `${userData.uid}/picture/profile_pic`
        );



        profilePicObj.once('value', (snapshot) => {
            profilePic = snapshot.val();
            if (profilePic == null) {
                profilePic = 'I Have NO Pic!';
            }
        });

        if (postData) {
            const toast = document.querySelector(".toast");
            if (postInOrg == true) {
                postInOrgFunc(
                    userData.organization,
                    userData.uid,
                    userData.username,
                    profilePic,
                    postData
                );
                setPostData('');
                document.querySelector('textarea').classList.remove('not-empty');
                return;
            }
            writeNewPost(userData.uid, userData.username, profilePic, postData);

            /*userPostsArr.push(postObj);
            updateData(userPostsArr); */
            setPostData('');
            document.querySelector('textarea').classList.remove('not-empty');

            toast.style.transform = 'scale(1)';
            setTimeout(() => {
                toast.style.transform = 'scale(0)';
            }, 3000);
        }
        addToRecentPost(userData.uid, userData.username, profilePic, postData);
    };

    return (
        <ContentWrapper>
            <form onSubmit={handleSubmitPost}>
                <textarea
                    placeholder="What's up?"
                    type="text"
                    value={postData}
                    onChange={onChangeText}
                ></textarea>
                <button type="submit">Post</button>
            </form>
            {userData.organization ? <label>
                Post only in organization
                <input
                    type="checkbox"
                    className="checkbox"
                    onClick={() => setPostInOrg(!postInOrg)}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <rect
                        x="4.75"
                        y="4.75"
                        width="14.5"
                        height="14.5"
                        rx="0.75"
                        fill="black"
                        stroke="black"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M7.75 12.25L10.75 15.25L16.75 9.25"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </label> : ''}

            <p className="toast" style={{ transform: 'scale(0)' }}>
                Posted successfully!
                <Link to={ROUTES.PROFILE_WALL}>Show post</Link>
            </p>
        </ContentWrapper>
    );
};

export default SocialPost;
