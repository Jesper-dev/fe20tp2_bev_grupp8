import React, { useState, useContext, useEffect } from 'react';

import { FirebaseContext } from '../../../../firebase';
import { useSelector } from 'react-redux';

import 'firebase/database';

import {
    ContentWrapper,
    ProfileSettingsImg,
    CropperWrapper,
} from './ChangeLogoElements';

import LogoImgCropper from './LogoImgCropper';

const ChangeLogo = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const OrgLogoReducer = useSelector((state) => state.OrgLogoReducer);
    const logo = useSelector((state) => state.OrgLogoReducer);

    const [inputImg, setInputImg] = useState('');
    const [logoDB, setLogoDB] = useState('');

    useEffect(() => {
        getLogo();
    }, [logoDB, logo]);

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

    const updateOrg = (logo) => {
        firebase.organization(user.organization).child('/Logo').set({
            Logo: logo,
        });
    };

    const getLogo = () => {
        firebase
            .organization(user.organization)
            .child('/Logo')
            .on('value', (snapshot) => {
                const data = snapshot.val();
                setLogoDB(data.Logo);
            });
    };

    const handleSubmitImage = (e) => {
        // upload blob to firebase 'images' folder with filename 'image'
        e.preventDefault();
        setInputImg(null);
        updateOrg(logo);
    };

    return (
        <>
            <ContentWrapper>
                {!logoDB ? (
                    <ProfileSettingsImg src={logoDB} />
                ) : (
                    <ProfileSettingsImg src={logoDB} />
                )}
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
                            <LogoImgCropper
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

export default ChangeLogo;
