import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../../firebase/context';

import UserPostsElement from './UserPostsElement';
import UserPostCard from './UserPostCard'

const UserPosts = () => {

	const firebase = useContext(FirebaseContext);

	const [userPost, setUserPost] = useState('');
	const [likedPosts, setLikedPosts] = useState('');

	const userData = JSON.parse(localStorage.getItem('authUser'));


	useEffect(() => {

		let postArray = []
		firebase.user(userData.uid + '/post/posts/').on('value', (snapshot) => {
			let data = snapshot.val();
			 for (const key in data) {
                postArray.push({ ...data[key] });
            }
			console.log(postArray)
			setUserPost(postArray);

		});

		firebase.users(userData.uid + '/likedPosts').on('value', (snapshot) => {
			let data = snapshot.val();
			if (data == null) {
				setLikedPosts([])
			} else {
				setLikedPosts(data);
			}
		});



	}, [firebase.db, userData.uid]);

/*
	const updateLikedPost = (postData, likeData) => {
		let userId = firebase.auth.currentUser.uid;

		let newPostKey = firebase.posts().push().key;


		let updates = {};
		let updatesUser = {};
		updates['/posts/' + /posts/ + userId] = postData;
		updatesUser[userId + '/post/posts/' + newPostKey] = postData;

	}


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
			let likeIndex = likedPosts.findIndex(item => item.timestamp == e.target.value);
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
 */

	return (
		<UserPostsElement>
			<h1>Posts</h1>
			{userPost ? userPost.map((item, index) => {
				return (
					//posts && users/post/posts
					<UserPostCard
					key={index}
					username={item.username}
					content={item.content}
					timestamp={item.timestamp}
					likeCount={item.likeCount}
					//handleChange={handleChange}
					///users/post/posts
					liked={item.liked}
					/>
				)
			}) : 'No posts, post something from the Social page'}
		</UserPostsElement>
	);
};

export default UserPosts;

/* const UserPosts = () => {
	const firebase = useContext(FirebaseContext);

	const [userPost, setUserPost] = useState('');
	const [likedPosts, setLikedPosts] = useState('');

	const userData = JSON.parse(localStorage.getItem('authUser'));

	useEffect(() => {

		let postArray = []
		firebase.user(userData.uid + '/post/posts/').on('value', (snapshot) => {
			let data = snapshot.val();
			 for (const key in data) {
                postArray.push({ ...data[key] });
            }
			console.log(postArray)
			setUserPost(postArray);

		});

		firebase.users(userData.uid + '/likedPosts').on('value', (snapshot) => {
			let data = snapshot.val();
			if (data == null) {
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
			let likeIndex = likedPosts.findIndex(item => item.timestamp == e.target.value);
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

	return (
		<UserPostsElement>
			<h1>Posts</h1>
			{userPost ? userPost.map((item, index) => {
				return (
					//posts && users/post/posts
					<UserPostCard
					key={index}
					username={item.username}
					content={item.content}
					timestamp={item.timestamp}
					likeCount={item.likeCount}
					handleChange={handleChange}
					///users/post/posts
					liked={item.liked}
					/>
				)
			}) : 'No posts, post something from the Social page'}
		</UserPostsElement>
	);
};

export default UserPosts; */

