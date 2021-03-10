import React from 'react'
import { ContentWrapper } from './ProfileSettingsElements'

import ProfileImgChoose from '../profile-img/ProfileChooseImg'

const ProfileSettings = () => {
    return (
        <>
        <ContentWrapper>
            <h1>Profile Settings</h1>
            <ProfileImgChoose />
        </ContentWrapper>
        </>
    )
}

export default ProfileSettings
