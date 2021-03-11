import React from 'react';
import { ContentWrapper } from './ProfileSettingsElements';

import ProfileImgChoose from './profile-img/ProfileChooseImg';
import CustomizeHomepage from './customize-homepage/CustomizeHomepage';

const ProfileSettings = () => {
    return (
        <>
            <ContentWrapper>
                <h1>Profile Settings</h1>
                <ProfileImgChoose />
                <CustomizeHomepage />
            </ContentWrapper>
        </>
    );
};

export default ProfileSettings;
