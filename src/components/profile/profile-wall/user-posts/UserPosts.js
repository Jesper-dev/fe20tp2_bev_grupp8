import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../../firebase/context';
import UserPostsElement from './UserPostsElement';
import UserPostCard from './UserPostCard'

let usersPost = [];
let data;
let liked = false;
let likeCount;
const UserPosts = () => {
    const [checkLiked, setCheckedLiked] = useState(false)
    const [checkCount, setCheckCount] = useState('');
    const [postIndex, setPostIndex] = useState(0)
    const [userPost, setUserPost] = useState('');

    const firebase = useContext(FirebaseContext);

    const userData = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        usersPost = [];
        firebase.db.ref('users/' + userData.uid + '/post/posts').on('value', (snapshot) => {
            data = snapshot.val();
            setUserPost(data);
        });
    }, []);

    const getDate = (number) => {
        let date = new Date(number)
        let day = date.toLocaleDateString();
        return day;
    }

    const newlikeKey = (userId, liked, likeCount) => {
        //console.log('Like');
        firebase.db.ref('users/' + userId + '/post/posts/' + postIndex).update({
            liked,
            likeCount,
        });
    };

    //const isLikeValid = (el) => el === userPost.timestamp;

    const handleChange = (e) => {
        setCheckedLiked(!checkLiked)
        console.log(e.target.value)
        let timestamp = e.target.value;
        for(let i = 0; i < userPost.length; i++) {
            console.log(userPost[i].timestamp)
        }
        let index = userPost.findIndex(x => x.timestamp == timestamp)
        setPostIndex(index)
        newlikeKey(userData.uid, checkLiked, 1)
        //console.log(newlikeKey(likeCount));
    };


    return (
        <UserPostsElement>
            <h2>Posts</h2>
            {userPost ? userPost.map((item, index) => {
                return (
                    <UserPostCard
                    key={index}
                    username={item.username}
                    content={item.content}
                    timestamp={item.timestamp}
                    likeCount={item.likeCount}
                    liked={item.liked}
                    handleChange={handleChange}
                    />
                )
            }) : 'No posts, post something from Social page'}
        </UserPostsElement>
    );
};

export default UserPosts;
