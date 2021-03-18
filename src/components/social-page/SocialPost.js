import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../firebase/context'
import firebase from 'firebase';
import 'firebase/database';
import { ContentWrapper }  from './SocialPostElements';
import { withAuthorization } from '../session'; //must be logged in to see content

const SocialPost = () => {

const firebase = useContext(FirebaseContext)
const [postData, setPostData] = useState('')

const userData = JSON.parse(localStorage.getItem('authUser'));

const onChangeText = event => {
    setPostData(event.target.value);
};

const newPostKey = (userId, posts) => {
    console.log("Hejsan")
    firebase.db.ref('users/' + userId + "/post").set({
        posts
    });
}

const handleSubmitPost = (e) => {
    e.preventDefault()
    let postsArr = firebase.db.ref('users/' + userData.uid + '/post/posts');
    let data;
    if(postsArr === null) {
        return;
    }

    postsArr.on('value', (snapshot) => {
        data = snapshot.val();
        if(data == null) {
            return;
        }
    });


    let date = Date.now();

    const postObj = {
        username: userData.username,
        content: postData,
        likes: 0,
        timestamp: date
    }

    data.push(postObj)
    newPostKey(userData.uid, data);

    console.log(data)

    setPostData('');
}

    return(
    <ContentWrapper>
        <h2>Post here!</h2>
        <form onSubmit={handleSubmitPost}>
            <input
                placeholder="What's up?"
                type="text"
                value={postData}
                onChange={onChangeText}
                />
                <button type="submit">Vest</button>
        </form>
    </ContentWrapper>
    )
}



export default SocialPost;