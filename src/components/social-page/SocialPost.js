import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../firebase/context';
import { ContentWrapper } from './SocialPostElements';
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
        picture: picture
    };

    // Get a key for a new Post.
    let newPostKey = firebase.post(uid).child("posts").push().key;
/*     var newPostKey = firebase.db().ref('posts').push().key; */

    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    let updatesUser = {};
    updates[newPostKey] = postData;
    updatesUser[uid + '/posts/' + newPostKey] = postData;

    firebase.users().update(updatesUser);
    return firebase.posts().update(updates);
  }

  const addToRecentPost = (uid, username, picture, postData) => {
      firebase.user(uid).child('/recentPost/').set({
        postData: {
            username: username,
            content: postData,
            likeCount: 0,
            liked: false,
            timestamp: Date.now(),
            uid: uid,
            picture: picture,
        },
      })
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

    const postInOrgFunc = (org, uid, username, picture, postData) => {
        firebase.organization(org).child('/recentlyPosted/').set({
            postData: {
                username: username,
                content: postData,
                likeCount: 0,
                liked: false,
                timestamp: Date.now(),
                uid: uid,
                picture: picture,
            },
          })
    };

    const handleSubmitPost = (e) => {
        e.preventDefault();
        if(postInOrg == true) {
            postInOrgFunc(userData.organization, userData.uid, userData.username, profilePic, postData)
            return;
        }

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
            /*userPostsArr.push(postObj);
            updateData(userPostsArr); */
            setPostData('');
			document.querySelector("textarea").classList.remove('not-empty');
            document.querySelector("textarea").style.backgroundColor = "red";
            setTimeout(() => {
                document.querySelector("textarea").style.backgroundColor = "transparent";
            }, 2500);
        }
        addToRecentPost(userData.uid, userData.username, profilePic, postData)
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
            <div>
                <p>Post in org: </p>
                <input type="checkbox" onClick={() => setPostInOrg(!postInOrg)}/>
            </div>
            {/* POSTS FROM PEOPLE YOU FOLLOW */}
        </ContentWrapper>
    );
};

export default SocialPost;


