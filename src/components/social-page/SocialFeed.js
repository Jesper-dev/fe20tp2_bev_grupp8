import React, {useContext, useEffect, useState} from 'react';
// import UserPostCard from '../user-posts/UserPostCard';
// import LikedPostsElement from "./LikedPostsElement";
import { FirebaseContext } from '../firebase/context';

const SocialFeed = () => {
	const userData = JSON.parse(localStorage.getItem('authUser'));
	const firebase = useContext(FirebaseContext);
	const [usersList, setUsersList] = useState([])
	const [followingList, setFollowingList] = useState([])
	const [mounted, setMounted] = useState(true)

    useEffect(() => {
		setMounted(false)
		getUsers()
		// findFollowingUsers()
		// getFollowingUserPosts(usersList, followingList)
		// firebase.db.ref('users/' + userData.uid + '/post/posts').on('value', (snapshot) => {
		// 	let data = snapshot.val();
		// 	setUserPost(data);
		// });

		// firebase.db.ref('users/' + userData.uid + '/likedPosts').on('value', (snapshot) => {
		// 	let data = snapshot.val();
		// 	if (typeof data === "undefined" || data === null) {
		// 		setLikedPosts([])
		// 	} else {
		// 		setLikedPosts(data);
		// 	}
		// });

		return () => {
			setMounted(true)
		}
	}, [firebase.db, userData.uid, mounted]);

	const getUsers = () => {
        firebase.users().once('value', (snapshot) => {
            const data = snapshot.val();
            let users = [];
            for (const key in data) {
				const obj = {
					id: key,
					username: data[key].username,
					email: data[key].email,
					posts: data[key].posts
				}
                users.push(obj);
            }
			console.log(users)
			setUsersList(users)
			findFollowingUsers(users)
        });
	}

	const findFollowingUsers = (array) => {
		firebase
            .user(userData.uid)
            .child('/following')
            .once('value', (snapshot) => {
				const data = snapshot.val()
				let following = [];
				let list = []
				for (const key in data) {
					following.push(data[key].username);
				}
				following.forEach((item, index) => {
					if(item === array[index].username) {
						list.push(array[index])
					}
				})
				getFollowingUserPosts(list)
			});
	}

	const getFollowingUserPosts = (array) => {
		let userPosts = []
		array.forEach((item, index) => {
            userPosts.push(item.posts)
		})

		console.log(userPosts[0])
	}

   /*
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

	*/

return(

	<div>
		<h1>Hej</h1>
	</div>

    // <LikedPostsElement>
    //     <h1>Liked posts</h1>
    //     {likedPosts ? likedPosts.map((item, index) => {
    //         return (
    //             <UserPostCard
    //             key={index}
    //             username={item.username}
    //             content={item.content}
    //             timestamp={item.timestamp}
    //             liked={item.liked}
    //             likeCount={item.likeCount}
    //             handleChange={handleChange}
    //             />
    //         )
    //     }) : 'No liked posts'}
    // </LikedPostsElement>
);
};

export default SocialFeed;