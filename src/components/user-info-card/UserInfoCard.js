import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { FirebaseContext } from '../firebase/context';
import UserInfoCardElement from "./UserInfoCardElement";

import UserPostCard from "../profile/profile-wall/user-posts/UserPostCard";

import Backbutton from '../shared/button/back-button/BackButton'

const UserInfoCard = () => {
	const { id } = useParams();

	const firebase = useContext(FirebaseContext);
	const [userData, setUserData] = useState();

	useEffect(() => {
		const usersRef = firebase.users();
		usersRef.orderByChild("username").equalTo(id).on("child_added", (snapshot) => {
			console.log(snapshot.val());
			setUserData(snapshot.val());
		  });
	}, [firebase, id]); //changed!

	return(
		<UserInfoCardElement>
			<Backbutton />
			{userData == null ? <p>Loading user data...</p> : <>
			<img src={userData.picture.profile_pic} alt="profile pic"/>
			<h1>{userData.username}</h1>
			<p>{userData.currency.currency.toLocaleString()}$</p>
			<p>{userData.email}</p>
			{userData.post.posts.length > 0 ? userData.post.posts.map((postObj, index) => {
				return(
					// <div key={index} className="post-card">
					// 	<p>{postObj.content}</p>
					// 	<p>Likes: {postObj.likeCount}</p>
					// 	<p>Liked: {postObj.liked ? "True" : "False"}</p>
					// 	<p>{new Date(postObj.timestamp).toLocaleDateString()}</p>
					// </div>
					<UserPostCard
					key={index}
					username={postObj.username}
					content={postObj.content}
					timestamp={postObj.timestamp}
					liked={postObj.liked}
					likeCount={postObj.likeCount}
					/* handleChange={handleChange} */
					/>
				);
			}) : <p>{userData.username} has not posted anything(</p>}
			</>}
		</UserInfoCardElement>
	);
};

export default UserInfoCard;