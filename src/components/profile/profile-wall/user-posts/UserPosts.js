import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../../firebase/context';

import UserPostsElement from './UserPostsElement';
import UserPostCard from './UserPostCard'


const UserPosts = () => {
	const firebase = useContext(FirebaseContext);

	const [userPost, setUserPost] = useState('');
	const userData = JSON.parse(localStorage.getItem('authUser'));

	useEffect(() => {

		firebase.db.ref('users/' + userData.uid + '/post/posts').on('value', (snapshot) => {
			let data = snapshot.val();
			setUserPost(data);
		});
	}, []);

	const updateData = (data) => {
		let userId = firebase.auth.currentUser.uid;

		firebase.db.ref("users/" + userId + "/post/posts").set(
			data
		);
	};

	const handleChange = (e) => {
		let index = userPost.findIndex(item => item.timestamp == e.target.value);

		if (userPost[index].liked) {
			userPost[index].likeCount--;
			userPost[index].liked = false;
            // remove userPost[index] from likedArray

		} else {
			userPost[index].likeCount++;
			userPost[index].liked = true;
            // add userPost[index] to likedArray
		}

		console.log(`ClickedPostContent: ${userPost[index].content}`)
		console.log(`Liked: ${userPost[index].liked}`);
		console.log(`LikeCount: ${userPost[index].likeCount}`);

		updateData(userPost);
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
					liked={item.liked}
					likeCount={item.likeCount}
					handleChange={handleChange}
					/>
				)
			}) : 'No posts, post something from Social page'}
		</UserPostsElement>
	);
};

export default UserPosts;
