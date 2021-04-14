import React, { useEffect, useState, useContext } from 'react';

const PostCard = ({username}) => {
    const firebase = useContext(FirebaseContext);

    const user = JSON.parse(localStorage.getItem('authUser'));

    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        firebase.user(user.uid).child("posts/").on('value', snapshot => {
            const data = snapshot.val();
            const dataArray = Object.values(data);
            setUserPosts(dataArray);
        });
    }, []);
	const handleChange = () => {

	};

    return (
		<>
		</>
    );
};

export default PostCard;