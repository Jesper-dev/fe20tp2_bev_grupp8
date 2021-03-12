import React, { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../../../firebase/context'

import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '../../../../redux/actions';

import {
    ContentWrapper,
    ProfileSettingsImg,
    CropperWrapper,
} from './ProfileImgElements';

import ProfileSvg from '../../../svgs/ProfileSvg';

import ImageCropper from './ProfileImgCropper';

const ProfileChooseImg = () => {
    const dispatch = useDispatch();
    const firebase = useContext(FirebaseContext)

    const ProfileImgReducer = useSelector((state) => state.ProfileImgReducer);

    const [blob, setBlob] = useState(null);
    const [inputImg, setInputImg] = useState('');

    const [blobUrl, setBlobUrl] = useState(null);

    const getBlob = (blob) => {
        // pass blob up from the ImageCropper component
        setBlob(blob);
    };

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

    const handleSubmitImage = (e) => {
        // upload blob to firebase 'images' folder with filename 'image'
        e.preventDefault();
        console.log(inputImg);
        console.log(blob);

        setBlobUrl(URL.createObjectURL(blob));
        setInputImg(null);
        dispatch(setProfileImage(URL.createObjectURL(blob)));

        // firebase
        //     .storage()
        //     .ref('images')
        //     .child('image')
        //     .put(blob, { contentType: blob.type })
        //     .then(() => {
        //         // redirect user
        //     })
        // firebase.user(authUser.user.uid).set({
        //             image
        //         });


        window.localStorage.setItem(
            'croppedAreaPixels',
            JSON.stringify(blobUrl)
        );

        /*   myImage.src = objectURL; */
    };

    return (
        <>
            <ContentWrapper>
                {!ProfileImgReducer ? <ProfileSvg className="svg-avatar" /> :
<ProfileSettingsImg src={ProfileImgReducer} />
                }
           {/*      <ProfileSettingsImg src={ProfileImgReducer} />
                <ProfileSvg /> */}

                <form onSubmit={handleSubmitImage}>
                    <label for="file-upload" className="custom-file-upload">
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
                                getBlob={getBlob}
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
