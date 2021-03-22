import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../../firebase/context';
import UserPostsElement from './UserPostsElement';
import UserPostCard from './UserPostCard'

let usersPost = [];
let data;
const UserPosts = () => {
    const [checkLiked, setCheckedLiked] = useState(false)

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

    const newlikeKey = (userId, like) => {
        console.log('Like');
        firebase.db.ref('users/' + userId + '/post/posts').update({
            like,
        });
    };

    console.log(checkLiked);

    const handleChange =  (e) => {
        //add like to firebase
        //e.preventDefault();
        setCheckedLiked(!checkLiked)
        console.log(checkLiked);

    /*    let likeArr = firebase.db.ref('users/' + userData.uid + '/post/posts');
        let data;
        if (likeArr === null) {
            return;
        } */

        /* postsArr.on('value', (snapshot) => {
            data = snapshot.val();
            if (data == null) {
                return;
            }
        }); */

/*         const likesObj = {
            likes: 0,
        };

        if (likesObj.likes) {
            data.push(likesObj);
            // newPostKey(userData.uid, data);

            console.log(data);

            setUserPost('');
        } */
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
                    likes={item.likes}
                    handleChange={handleChange}
                    />
                )
            }) : 'No posts, post something from Social page'}
        </UserPostsElement>
    );
};


export default UserPosts;
