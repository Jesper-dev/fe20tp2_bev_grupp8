import React, { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import { ButtonWrapper, Mainwrapper } from './ProfileSettingsElements';

import ContentWrapper from '../../shared/wrappers/ContentWrapper';

import LeftSettingsNav from '../../shared/leftside-settings-nav/LeftSettingsNav';

import Achievments from '../profile-achievments/ProfileAchievments';
import EditProfile from './edit-profile/EditProfile';
import LevelWall from './profile-xp/LevelWall';
import ProfileImgChoose from './profile-img/ProfileChooseImg';
import CustomizeHomepage from './customize-homepage/CustomizeHomepage';
import SignOutButton from '../../sign-out/SignOut';
import { ButtonPrimary } from '../../shared/button/ButtonElements';

import * as ROUTES from '../../../constants/routes';
import { FirebaseContext } from '../../firebase/context';

const ProfileSettings = () => {
    const firebase = useContext(FirebaseContext);

    const tabs = [
        {
            icon: <i className="fas fa-pen"></i>,
            label: ' Edit Profile',
            link: ROUTES.PROFILE_SETTINGS,
        },
        {
            icon: <i className="fas fa-hammer"></i>,
            label: ' Customize Application',
            link: ROUTES.PROFILE_SETTINGS_CUSTOMIZE,
        },
        {
            icon: <i className="fas fa-trophy"></i>,
            label: ' Achievements',
            link: ROUTES.PROFILE_SETTINGS_ACHIEVMENTS,
        },
        {
            icon: <i className="fas fa-user"></i>,
            label: ' Level',
            link: ROUTES.PROFILE_SETTINGS_LEVEL,
        },
    ];

    const NavTitle = 'Account Settings';
    return (
        <ContentWrapper>
            <Mainwrapper>
                {/*    <h1>Profile Settings</h1> */}
                <LeftSettingsNav tabs={tabs} NavTitle={NavTitle} />

                <Route
                    exact
                    path={ROUTES.PROFILE_SETTINGS}
                    component={EditProfile}
                />
                <Route
                    exact
                    path={ROUTES.PROFILE_SETTINGS_CUSTOMIZE}
                    component={CustomizeHomepage}
                />
                <Route
                    exact
                    path={ROUTES.PROFILE_SETTINGS_ACHIEVMENTS}
                    component={Achievments}
                />
                <Route
                    exact
                    path={ROUTES.PROFILE_SETTINGS_LEVEL}
                    component={LevelWall}
                />
            </Mainwrapper>
        </ContentWrapper>
    );
};

export default ProfileSettings;
