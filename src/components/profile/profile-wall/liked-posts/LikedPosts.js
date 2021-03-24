import React, {useContext, useEffect, useState} from 'react';
import UserPostCard from '../user-posts/UserPostCard';
import LikedPostsElement from "./LikedPostsElement";
import { FirebaseContext } from '../../../firebase/context';

const LikedPosts = () => {
	const firebase = useContext(FirebaseContext);

	const [likedPosts, setLikedPosts] = useState('');

	const userData = JSON.parse(localStorage.getItem('authUser'));

	useEffect(() => {
		firebase.db.ref('users/' + userData.uid + '/likedPosts').on('value', (snapshot) => {
			let data = snapshot.val();
			setLikedPosts(data);
		});
	}, []);

    return(
		<LikedPostsElement>
			<h2>Liked posts</h2>
			{likedPosts ? likedPosts.map((item, index) => {
				return (
					<UserPostCard
					key={index}
					username={item.username}
					content={item.content}
					timestamp={item.timestamp}
					liked={item.liked}
					likeCount={item.likeCount}
					/* handleChange={handleChange} */
					/>
				)
			}) : 'No liked posts'}
    	</LikedPostsElement>
	);
};

export default LikedPosts;
