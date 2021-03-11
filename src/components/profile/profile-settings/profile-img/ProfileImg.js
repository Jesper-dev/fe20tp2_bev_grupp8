import React from 'react';
import { ProfileImgElement, UploadImg } from './ProfileImgElements';

const ProfileImg = ({ img }) => {
    return (
        <>
            <ProfileImgElement src={img} />
        </>
    );
};

export default ProfileImg;
