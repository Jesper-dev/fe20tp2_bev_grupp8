import React, { useEffect, useState, useContext } from 'react';

import {
    fetchOrgSnapshot
} from '../../shared/functions/firebase-functions';
import { FirebaseContext } from '../../firebase/context';

import UserPostCard from '../../shared/card/user-post-card/UserPostCard';

const CompRecentlyPosted = () => {
    const [postData, setPostData] = useState(null);
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        fetchOrgSnapshot(firebase, user.organization, '/recentlyPosted', setPostData)
    }, [])

    console.log(postData)

    return (
        <>
        {!postData ? null : (

            <UserPostCard
            //uid={arr[0]}
            
            username={postData.username}
            content={postData.content}
            timestamp={postData.timestamp}
            likeCount={postData.LikeCount}
            // liked={
                //     post.likedUsers.findIndex((user) => (user) =>
                //         user
                //     ) === -1
                //         ? false
                //         : true
                // }
                picture={postData.picture}
                />

                )}
                </>
                );
};

export default CompRecentlyPosted;
