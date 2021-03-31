import React from 'react';

import UserPosts from "./user-posts/UserPosts";
import LikedPosts from "./liked-posts/LikedPosts";

const ProfileWall = () => {

    return(
    <>
        <UserPosts/>
        <LikedPosts/>
    </>
    );
};

export default ProfileWall;
