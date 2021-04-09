import React, {useContext, useEffect, useState} from 'react';
import UserPostCard from '../profile/profile-wall/user-posts/UserPostCard';
import LikedPostsElement from "../profile/profile-wall/liked-posts/LikedPostsElement";
import { FirebaseContext } from '../firebase/context';

const SocialFeed = () => {
	const userData = JSON.parse(localStorage.getItem('authUser'));
	const firebase = useContext(FirebaseContext);
	const [followingList, setFollowingList] = useState([])
	const [followingPostsList, setFollowingPostsList] = useState([])
	const [mounted, setMounted] = useState(true)

    useEffect(() => {
		setMounted(false)
		getPostsFromFollowing()
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

	const getPostsFromFollowing = () => {
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

				console.log(array)
				let j = 0;
				for(let i = 0; j < array.length; i++){
					if(array[i] == undefined) {
						i = 0;
						j += 1
					}
                    if(following[j] == array[i].username) {
						list.push(array[i].posts)
                        console.log("The same")
					}
				}

				// following.forEach((item, index) => {
				// 	console.log(item, array[index].posts)
				// 	if(item.username === array[index].username) {
				// 		list.push(array[index].posts)
				// 	}
				// 	console.log(index)
				// })
				// console.log(list)
				// getFollowingUserPosts(list)
			});
	}

	const getFollowingUserPosts = (array) => {
		let userPosts = []
		array.forEach((item) => {
			userPosts.push(item)

		})
		let list = makePostsList(userPosts)
		setFollowingPostsList(list)
	}

	const makePostsList = (array) => {
		let postsList = []
		array.forEach((item, index) => {
			for(const key in item) {
				postsList.push(item[key])
			}
		})
        return postsList;
	}


	// const handleChange = (e) => {
	// 	let index = userPost.findIndex(item => item.timestamp == e.target.value);
	// 	if (userPost[index].liked) {
	// 		userPost[index].likeCount--;
	// 		userPost[index].liked = false;
    //         // remove userPost[index] from likedArray
	// 		let likeIndex = likedPosts.findIndex(item => item.timestamp === e.target.value);
	// 		likedPosts.splice(likeIndex, 1);
	// 	} else {
	// 		userPost[index].likeCount++;
	// 		userPost[index].liked = true;
    //         // add userPost[index] to likedArray
	// 		likedPosts.push(userPost[index]);
	// 	}

	// 	// console.log(`ClickedPostContent: ${userPost[index].content}`)
	// 	// console.log(`Liked: ${userPost[index].liked}`);
	// 	// console.log(`LikeCount: ${userPost[index].likeCount}`);

	// 	updateData(userPost, likedPosts);
	// };



return(

	<LikedPostsElement>
		<h2>Recent posts from people you follow</h2>
		{followingPostsList ? followingPostsList.map((item, index) => {
            return (
                <UserPostCard
                    key={index}
                    username={item.username}
                    content={item.content}
                    timestamp={item.timestamp}
                    liked={item.liked}
                    likeCount={item.likeCount}
                    // handleChange={handleChange}
                />
            )
        }) : 'No liked posts'}
	</LikedPostsElement>

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