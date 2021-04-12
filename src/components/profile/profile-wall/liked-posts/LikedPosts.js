import React, {useContext, useEffect, useState} from 'react';
import UserPostCard from '../user-posts/UserPostCard';
import LikedPostsElement from "./LikedPostsElement";
import { FirebaseContext } from '../../../firebase/context';

const LikedPosts = () => {
	const firebase = useContext(FirebaseContext);

	const [likedPosts, setLikedPosts] = useState([]);

	const user = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        firebase.posts().on('value', (snapshot) => {
            const data = snapshot.val();
            const entries = Object.entries(data);

            let dataArray = [];

            entries.forEach((entry) => {
                const postId = entry[0];
                const postData = entry[1];

				// prefer to have uid as key of the postdata, but hard to reach it later?
                let newObj = {
                    postId,
                    postData,
                };
			
                dataArray.push(newObj);
            });
			setLikedPosts(dataArray.filter(obj => obj.postData.likedUsers.includes(user.uid)));
        });
    }, []);

    return(
		<LikedPostsElement>
			<h1>Liked posts</h1>
			{likedPosts ? likedPosts.map((obj, index) => {
				return (
					<UserPostCard
						key={index}
						postId={obj.postId}
						username={obj.postData.username}
						content={obj.postData.content}
						timestamp={obj.postData.timestamp}
						likeCount={obj.postData.likeCount}
						liked={true}
						picture={obj.postData.picture}
					/>
				)
			}) : 'No liked posts'}
    	</LikedPostsElement>
	);
};

export default LikedPosts;
