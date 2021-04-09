import React, {useContext, useEffect, useState} from 'react';
import UserPostCard from '../user-posts/UserPostCard';
import LikedPostsElement from "./LikedPostsElement";
import { FirebaseContext } from '../../../firebase/context';

const LikedPosts = () => {
	const firebase = useContext(FirebaseContext);

	const [userPost, setUserPost] = useState('');
	const [likedPosts, setLikedPosts] = useState('');

	const userData = JSON.parse(localStorage.getItem('authUser'));

	useEffect(() => {

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

	const updateData = (postData, likeData) => {
		let userId = firebase.auth.currentUser.uid;

		firebase.db.ref("users/" + userId + "/post/posts").set(
			postData
		);

		firebase.db.ref("users/" + userId + "/likedPosts").set(
			likeData
		);
	};

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
		<>bye anton</>
/* 		<LikedPostsElement>
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
    	</LikedPostsElement> */
	);
};

export default LikedPosts;
