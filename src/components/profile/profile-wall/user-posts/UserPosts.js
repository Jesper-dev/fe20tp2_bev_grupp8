import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../../firebase/context';
import UserPostsElement from './UserPostsElement';

let usersArray = [];
const UserPosts = () => {
    const [userPost, setUserPost] = useState('');

    const firebase = useContext(FirebaseContext);

    const userData = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        usersArray = [];
        firebase.db.ref('users/' + userData.uid).on('value', (snapshot) => {
            const data = snapshot.val();
            //console.log(data);

            for (const key in data) {
                usersArray.push({ ...data[key] });
            }
            setUserPost(usersArray);
        });
    }, []);
    console.log(userPost[5]);
    return (
        <UserPostsElement>
            <h2>Posts</h2>
            <ul>
                {userPost.post
                    ? userPost.post.post.map((item) => {
                          <li>{item}</li>;
                      })
                    : ''}
            </ul>
            {/* <PostList /> */}
        </UserPostsElement>
    );
};

/* const PostList = () => (
    <ul>
        {data.posts
            ? data.post.posts.map((item) => {
                  <li>{item.content}</li>;
              })
            : ''}
    </ul>
); */

// const PostItem = ({ data }) => (
//     <li>
//         <strong>{data}</strong>
//     </li>
// );

export default UserPosts;
