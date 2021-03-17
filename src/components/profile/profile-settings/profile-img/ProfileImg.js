import React from 'react';
import { ProfileImgElement } from './ProfileImgElements';

const ProfileImg = ({ img }) => {
    return (
        <>
            <ProfileImgElement src={img} />
        </>
    );
};

export default ProfileImg;
