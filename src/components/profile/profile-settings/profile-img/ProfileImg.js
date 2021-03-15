import React from 'react';
import { ProfileImgElement, UploadImg } from './ProfileImgElements';

const ProfileImg = ({ img }) => {
    console.log('Img is: ', {img})
    return (
        <>
            <ProfileImgElement src={img} />
        </>
    );
};

export default ProfileImg;
