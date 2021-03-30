import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../firebase/context';
import { ContentWrapper } from './SocialPostElements';
// import 'firebase/database';
// import { withAuthorization } from '../session';

const SocialPost = () => {
    const firebase = useContext(FirebaseContext);
    const [postData, setPostData] = useState('');

    const userData = JSON.parse(localStorage.getItem('authUser'));

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

    const handleSubmitPost = (e) => {
        e.preventDefault();

		const userPostsObj = firebase.user(`${userData.uid}/post/posts`);
        if (userPostsObj == null) {
			return;
        }
		
		let userPostsArr;

        userPostsObj.on('value', (snapshot) => {
            userPostsArr = snapshot.val();
            if (userPostsArr == null) {
                return;
            }
        });

        const postObj = {
            username: userData.username,
            content: postData,
            likeCount: 0,
            liked: false,
            timestamp: Date.now(),
        };

        if (postObj.content) {
            userPostsArr.push(postObj);
            updateData(userPostsArr);

            setPostData('');
			document.querySelector("textarea").classList.remove('not-empty');
        }
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
            {/* POSTS FROM PEOPLE YOU FOLLOW */}
        </ContentWrapper>
    );
};

export default SocialPost;
