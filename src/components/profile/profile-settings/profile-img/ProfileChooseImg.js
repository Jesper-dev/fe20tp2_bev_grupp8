import React, { useState, useContext } from 'react';

import { FirebaseContext } from '../../../firebase/context'
import { useSelector } from 'react-redux';

import 'firebase/database'

import {
    ContentWrapper,
    ProfileSettingsImg,
    CropperWrapper,
} from './ProfileImgElements';

import ProfileSvg from '../../../svgs/ProfileSvg';

import ImageCropper from './ProfileImgCropper';

const ProfileChooseImg = () => {
    const firebase = useContext(FirebaseContext)

    const ProfileImgReducer = useSelector((state) => state.ProfileImgReducer);
    const profileImg = useSelector((state) => state.ProfileImgReducer)

    const [inputImg, setInputImg] = useState('');

    const onInputChange = (e) => {
        // convert image file to base64 string
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener(
            'load',
            () => {
                setInputImg(reader.result);
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    const updateUser = (userId, imageUrl) => {
        firebase.db.ref('users/' + userId + "/picture").set({
          profile_pic: imageUrl
        });
    }

    // const getImage = (userId) => {
    //     const myImg = firebase.db.ref('users/' + userId + '/picture');
    //     myImg.on('value', (snapshot) => {
    //     const data = snapshot.val();
    //     console.log(data);
    //    });
    // }

    const user = JSON.parse(localStorage.getItem('authUser'))

    const handleSubmitImage = (e) => {
        // upload blob to firebase 'images' folder with filename 'image'
        e.preventDefault();
        setInputImg(null);
        updateUser(user.uid, profileImg)
    };



    return (
        <>
            <ContentWrapper>
                {!ProfileImgReducer ? <ProfileSvg className="svg-avatar" /> :
            <ProfileSettingsImg src={ProfileImgReducer} />
                }
                <form onSubmit={handleSubmitImage}>
                    <label htmlFor="file-upload" className="custom-file-upload">
                   <i className="fas fa-cloud-upload-alt"></i> Upload Image
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={onInputChange}
                    />
                     <button type="submit">Save Image</button>
                    {inputImg && (
                        <CropperWrapper>
                            <ImageCropper
                                // getBlob={getBlob}
                                inputImg={inputImg}
                            />
                        </CropperWrapper>
                    )}

                </form>
            </ContentWrapper>
        </>
    );
};

export default ProfileChooseImg;
