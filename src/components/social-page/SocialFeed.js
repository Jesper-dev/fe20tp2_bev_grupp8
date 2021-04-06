import React, {useContext, useEffect, useState} from 'react';
import UserPostCard from '../user-posts/UserPostCard';
import LikedPostsElement from "./LikedPostsElement";
import { FirebaseContext } from '../../../firebase/context';

const SocialFeed = () => {

/* 	useEffect(() => {

		firebase.db.ref('users/' + userData.uid + '/post/posts').on('value', (snapshot) => {
			let data = snapshot.val();
			setUserPost(data);
		});

		firebase.db.ref('users/' + userData.uid + '/likedPosts').on('value', (snapshot) => {
			let data = snapshot.val();
			if (typeof data === "undefined" || data === null) {
				setLikedPosts([])
			} else {
				setLikedPosts(data);
			}
		});
	}, [firebase.db, userData.uid]);


	const handleChange = (e) => {
		let index = userPost.findIndex(item => item.timestamp == e.target.value);
		if (userPost[index].liked) {
			userPost[index].likeCount--;
			userPost[index].liked = false;
            // remove userPost[index] from likedArray
			let likeIndex = likedPosts.findIndex(item => item.timestamp === e.target.value);
			likedPosts.splice(likeIndex, 1);
		} else {
			userPost[index].likeCount++;
			userPost[index].liked = true;
            // add userPost[index] to likedArray
			likedPosts.push(userPost[index]);
		}

		// console.log(`ClickedPostContent: ${userPost[index].content}`)
		// console.log(`Liked: ${userPost[index].liked}`);
		// console.log(`LikeCount: ${userPost[index].likeCount}`);

		updateData(userPost, likedPosts);
	};

return(

    <LikedPostsElement>
        <h1>Liked posts</h1>
        {likedPosts ? likedPosts.map((item, index) => {
            return (
                <UserPostCard
                key={index}
                username={item.username}
                content={item.content}
                timestamp={item.timestamp}
                liked={item.liked}
                likeCount={item.likeCount}
                handleChange={handleChange}
                />
            )
        }) : 'No liked posts'}
    </LikedPostsElement>
); */
};

export default SocialFeed;