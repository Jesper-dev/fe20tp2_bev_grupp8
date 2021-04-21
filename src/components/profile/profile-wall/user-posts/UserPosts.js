import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../../firebase/context';

import UserPostsElement from './UserPostsElement';
import UserPostCard from '../../../shared/card/user-post-card/UserPostCard';

const UserPosts = () => {
    const firebase = useContext(FirebaseContext);

    const [userPosts, setUserPosts] = useState([]);

    const user = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
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

			setUserPosts(dataArray.filter(obj => obj.postData.userId == user.uid));
        });
    }, []);

    return (
        <UserPostsElement>
            <h1>Posts</h1>
            {userPosts
                ? userPosts.map((obj, index) => {
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
                : 'No posts, post something from the Social page'}
        </UserPostsElement>
    );
};

export default UserPosts;
