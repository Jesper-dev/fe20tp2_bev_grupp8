import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { FirebaseContext } from '../firebase/context';

import Backbutton from '../shared/button/back-button/BackButton'

const UserInfoCard = () => {
	const { id } = useParams();

	const firebase = useContext(FirebaseContext);
	const [userData, setUserData] = useState();

	useEffect(() => {
		const usersRef = firebase.users();
		usersRef.orderByChild("username").equalTo(id).on("child_added", (snapshot) => {
			console.log(snapshot.val());
		  });
		}, []);

	return(
		<>
		<Backbutton />
		<h1>{id}</h1>
		</>
	);
};

export default UserInfoCard;