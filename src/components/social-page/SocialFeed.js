import React, { useContext, useEffect, useState } from 'react';
import UserPostCard from '../shared/card/user-post-card/UserPostCard';
import Wrapper from '../profile/profile-wall/liked-posts/LikedPostsElement';
import { FirebaseContext } from '../firebase/context';

const SocialFeed = () => {
    const userData = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const [followingPostsList, setFollowingPostsList] = useState([]);
    const [mounted, setMounted] = useState(true);

	const [recentPosts, setRecentPosts] = useState([]);
    const [hotPosts, setHotPosts] = useState([]);

    useEffect(() => {
        setMounted(false);
        getPostsFromFollowing();
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

		// get all posts
        firebase.posts().on('value', (snapshot) => {
            const data = snapshot.val();
            let dataArray = [];

            for (const key in data) {
                const obj = {
                    postId: key,
                    postData: data[key],
                };

                dataArray.push(obj);
            }

			// get list of people you follow
			let usernameArray = [];
			let followingArray = [];

			firebase.user(userData.uid).child("following").once("value", snapshot => {
                if(!snapshot.val()) return;
				usernameArray = Object.values(snapshot.val()).map(obj => obj.username);
			});

			dataArray.forEach(obj => {
				if (usernameArray.some(el => obj.postData.username.includes(el))) {
					followingArray.push(obj);
				}
			});

			// get recent posts from people you follow (last 24hours)
			let recentPostsArray = [];

			followingArray.forEach(obj => {
				if (Date.now() - obj.postData.timestamp <= 86400000) {
					recentPostsArray.push(obj);
				}
			});

			setRecentPosts(recentPostsArray.sort((a, b) => b.postData.timestamp - a.postData.timestamp));

			// get most liked posts globablly
			const hotPostsArray = dataArray.sort(
                (obj1, obj2) =>
                    obj2.postData.likedUsers.length -
                    obj1.postData.likedUsers.length
            );

            setHotPosts(hotPostsArray.slice(0, 5));
        });

        return () => {
            setMounted(true);
        };
    }, [firebase.db, userData.uid, mounted]);

    const getPostsFromFollowing = () => {
        firebase.users().once('value', (snapshot) => {
            const data = snapshot.val();
            let users = [];
            console.log(data);
            for (const key in data) {
                const obj = {
                    id: key,
                    username: data[key].username,
                    email: data[key].email,
                    recentPost: data[key].recentPost,
                };
                users.push(obj);
            }
            findFollowingUsers(users);
        });
    };

    const findFollowingUsers = (array) => {
        firebase
            .user(userData.uid)
            .child('/following')
            .once('value', (snapshot) => {
                const data = snapshot.val();
                let following = [];
                let list = [];
                for (const key in data) {
                    following.push(data[key].username);
                }
                let j = 0;
                for (let i = 0; j < array.length; i++) {
                    if (array[i] == undefined) {
                        i = 0;
                        j += 1;
                    }
                    if (following[j] == array[i].username) {
                        list.push(array[i].recentPost);
                    }
                }
                getFollowingUserPosts(list);
            });
    };

    const getFollowingUserPosts = (array) => {
        let userPosts = [];
        array.forEach((item) => {
            userPosts.push(item);
        });
        let list = makePostsList(userPosts);
        console.log(list);
        setFollowingPostsList(list);
    };

    const makePostsList = (array) => {
        let postsList = [];
        array.forEach((item, index) => {
            for (const key in item) {
                postsList.push(item[key]);
            }
        });
        return postsList;
    };

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

    return (
        <>
{/*             <Wrapper>
                <h1>Recent posts from people you follow</h1>
                {followingPostsList
                    ? followingPostsList.map((item, index) => {
                          return (
                              <UserPostCard
                                  key={index}
                                  username={item.username}
                                  content={item.content}
                                  timestamp={item.timestamp}
                                  liked={item.liked}
                                  likeCount={item.likeCount}
                                  picture={item.picture}
                              />
                          );
                      })
                    : 'Follow people to see their posts!'}
            </Wrapper> */}
			<Wrapper>
                <h1>Recent posts</h1>
                {recentPosts
                    ? recentPosts.map((obj, index) => {
                          return (
                              <UserPostCard
                                  key={index}
                                  postId={obj.postId}
                                  username={obj.postData.username}
                                  content={obj.postData.content}
                                  timestamp={obj.postData.timestamp}
                                  likeCount={obj.postData.likeCount}
                                  liked={
                                      obj.postData.likedUsers.includes(
                                          userData.uid
                                      )
                                          ? true
                                          : false
                                  }
                                  picture={obj.postData.picture}
                              />
                          );
                      })
                    : 'No recent posts'}
            </Wrapper>
            <Wrapper>
                <h1>Hot posts</h1>
                {hotPosts
                    ? hotPosts.map((obj, index) => {
                          return (
                              <UserPostCard
                                  key={index}
                                  postId={obj.postId}
                                  username={obj.postData.username}
                                  content={obj.postData.content}
                                  timestamp={obj.postData.timestamp}
                                  likeCount={obj.postData.likeCount}
                                  liked={
                                      obj.postData.likedUsers.includes(
                                          userData.uid
                                      )
                                          ? true
                                          : false
                                  }
                                  picture={obj.postData.picture}
                              />
                          );
                      })
                    : 'No hot posts'}
            </Wrapper>
        </>
    );
};

export default SocialFeed;
