import React, { useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {
    ContentWrapper,
    ProfileImgElement,
    ImgWrapper,
    CropWrapper,
} from './ProfileImgElements';

const ProfileChooseImg = () => {
    const [img, setImg] = useState();

    const imageUploader = useRef(null);
    const uploadedImage = useRef(null);

    const handleImageUpload = (e) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                current.src = e.target.result;
                let srcR = e.target.result;
                setImg(srcR);
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
                <ImgWrapper>
                    <img
                        className="uploaded-img"
                        src={img}
                        ref={uploadedImage}
                    />
                </ImgWrapper>
            </ContentWrapper>
        </>
    );
};

export default ProfileChooseImg;
