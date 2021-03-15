import React, { useState, useContext } from 'react';

import { FirebaseContext } from '../../../firebase/context'
// import { withFirebase } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '../../../../redux/actions';

import 'firebase/database'
import axios from "axios"

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


    const updateUser = (userId, imageUrl) => {
        firebase.db.ref('users/' + userId + "/picture").set({
          profile_pic: imageUrl
        });
    }

    const getImage = (userId) => {
        const myImg = firebase.db.ref('users/' + userId + '/picture');
        myImg.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
       });
    }




    const user = JSON.parse(localStorage.getItem('authUser'))
    console.log(user.username)

    const handleSubmitImage = (e) => {
        // upload blob to firebase 'images' folder with filename 'image'
        e.preventDefault();
        getImage(user.uid)

        setBlobUrl(URL.createObjectURL(blob));
        setInputImg(null);

        console.log(URL.createObjectURL(blob))
        console.log(blob)

        dispatch(setProfileImage(URL.createObjectURL(blob)));

        // gs://grupp8-c364e.appspot.com/uid

        let blobFirebase = URL.createObjectURL(blob)

        updateUser(user.uid, blobFirebase)


    /*       window.localStorage.setItem(
            'croppedAreaPixels',
            JSON.stringify(blobUrl)
        ); */

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
