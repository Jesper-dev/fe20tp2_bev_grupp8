import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../../firebase/context';
import UserPostsElement from './UserPostsElement';
import UserPostCard from './UserPostCard'

let usersPost = [];
let data;
const UserPosts = () => {
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
                    likes={item.likes}
                    />
                )
            }) : 'No posts, post something from Social page'}
        </UserPostsElement>
    );
};


export default UserPosts;
