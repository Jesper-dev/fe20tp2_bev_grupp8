import React from 'react';

import UserPosts from "./user-posts/UserPosts";
import LikedPosts from "./liked-posts/LikedPosts";
import ProfileBio from './profile-bio/ProfileBio'

const ProfileWall = () => {
    return(
    <>
        <ProfileBio />
        <UserPosts />
        <LikedPosts />
    </>
    );
};

export default ProfileWall;
