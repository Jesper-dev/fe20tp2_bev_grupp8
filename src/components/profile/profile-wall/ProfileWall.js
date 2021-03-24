import React from 'react';

import UserPosts from "./user-posts/UserPosts";
import LikedPosts from "./liked-posts/LikedPosts";

const ProfileWall = () => {

    return <div>
        <UserPosts/>
        <LikedPosts/>
    </div>;
};

export default ProfileWall;
