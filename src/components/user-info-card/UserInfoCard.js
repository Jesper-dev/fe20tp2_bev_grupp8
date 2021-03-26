import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { FirebaseContext } from '../firebase/context';
import UserInfoCardElement from "./UserInfoCardElement";

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
	}, []);

	return(
		<UserInfoCardElement>
			<Backbutton />
			{userData == null ? <p>Loading user data...</p> : <>
			<img src={userData.picture.profile_pic}/>
			<h1>{userData.username}</h1>
			<p>{userData.currency.currency.toLocaleString()}$</p>
			<p>{userData.email}</p>
			{userData.post.posts.length > 0 ? userData.post.posts.map(postObj => {
				return(
					<>
						<p>{postObj.content}</p>
						<p>{postObj.likeCount}</p>
						<p>{new Date(postObj.timestamp).toLocaleDateString()}</p>
					</>
				);
			}) : <p>{userData.username} has not posted anything(</p>}
			</>}
		</UserInfoCardElement>
	);
};

export default UserInfoCard;