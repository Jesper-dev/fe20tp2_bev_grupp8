import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../firebase/context';
import { ContentWrapper } from './SocialPostElements';
// import 'firebase/database';
// import { withAuthorization } from '../session';

const SocialPost = () => {
    const firebase = useContext(FirebaseContext);
    const [postData, setPostData] = useState('');

    const userData = JSON.parse(localStorage.getItem('authUser'));

const writeNewPost = (uid, username, picture, postData) => {
    // A post entry.
    var postData = {
        username: username,
        content: postData,
        likeCount: 0,
        liked: false,
        timestamp: Date.now(),
        uid: uid,
      //body: body,
      //title: title,
        likes: 0,
        picture: picture
    };

    // Get a key for a new Post.
    let newPostKey = firebase.posts().push().key;
/*     var newPostKey = firebase.db().ref('posts').push().key; */

    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    let updatesUser = {};
    updates['/posts/' + newPostKey] = postData;
    updatesUser[uid + '/post/posts/' + newPostKey] = postData;

    firebase.users().update(updatesUser);
    return firebase.posts().update(updates);
  }



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

		const profilePicObj = firebase.user(`${userData.uid}/picture/profile_pic`);

		let profilePic;

        profilePicObj.once('value', (snapshot) => {
            profilePic = snapshot.val();
            if (profilePic == null) {
                profilePic = 'I Have NO Pic!'
            }
        });

if (postData) {
          writeNewPost(userData.uid, userData.username, profilePic, postData)
/*             userPostsArr.push(postObj);
            updateData(userPostsArr); */
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


