import React, { useRef } from 'react';

import { ContentWrapper, ProfileImgElement } from './ProfileImgElements';

const ProfileChooseImg = () => {
    const imageUploader = React.useRef(null);
    const uploadedImage = React.useRef(null);

    const handleImageUpload = (e) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <ContentWrapper>
                <input
                    type="file"
                    accept="image/*"
                    multiple="false"
                    onChange={handleImageUpload}
                />
                {/* <ProfileImgElement ref={uploadedImage} /> */}
                <div>
                    <img className="uploaded-img" ref={uploadedImage} />
                </div>
            </ContentWrapper>
        </>
    );
};

export default ProfileChooseImg;
