import React, {useContext} from 'react'
import UserPostCardWrapper from "./UserPostCardElement";
import { FirebaseContext } from '../../../firebase/context';

const UserPostCard = ({username, content, timestamp, likeCount, liked}) => {
	const firebase = useContext(FirebaseContext);

	const handleChange = () => {
		const userId = firebase.auth.currentUser.uid;
        
		console.log(userId);
		
		firebase.user(userId).child("/posts").on("value", snapshot => {

		});

		// toggle liked boolean on user/posts
		// update like count for user/posts && posts
		// 
	};

    return (
        <UserPostCardWrapper>
            <h2>{username}</h2>
            <p>{content}</p>
            <time>{new Date(timestamp).toLocaleDateString()}</time>
            <div>
                <label>
                    <input
                        className="checkbox"
                        type='checkbox'
                        checked={liked}
						onChange={handleChange}
                    />
                    <i className="fas fa-heart"></i>
                </label>
                <span className="likes">{likeCount}</span>
            </div>
        </UserPostCardWrapper>
    )
}

export default UserPostCard