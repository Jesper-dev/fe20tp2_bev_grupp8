import React from 'react';
import { ContentWrapper } from './ProfileSettingsElements';

import ProfileImgChoose from './profile-img/ProfileChooseImg';
import CustomizeHomepage from './customize-homepage/CustomizeHomepage';
import SignOutButton from '../../sign-out/SignOut'

const ProfileSettings = () => {
    return (
        <>
            <ContentWrapper>
                <h1>Profile Settings</h1>
                <ProfileImgChoose />
                <CustomizeHomepage />
                <SignOutButton />
                <button>DELETE ACCOUNT</button>
            </ContentWrapper>
        </>
    );
};

export default ProfileSettings;
