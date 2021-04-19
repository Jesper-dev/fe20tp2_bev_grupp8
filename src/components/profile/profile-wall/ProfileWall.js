import React from 'react';

import UserPosts from "./user-posts/UserPosts";
import LikedPosts from "./liked-posts/LikedPosts";
import ProfileBio from './profile-bio/ProfileBio'
import { PostsWrapper } from './ProfileWallElements'


const ProfileWall = () => {
    return(
    <>
        <ProfileBio />
        <PostsWrapper>

            <UserPosts />
            <LikedPosts />
        </PostsWrapper>
    </>
    );
};

export default ProfileWall;
