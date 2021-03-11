import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import { Switch, Route } from 'react-router-dom';

import {
    ContentWrapper,
    ProfileSettingsBtn,
    BtnsWrapper,
} from './ProfileElements';

import ProfileImg from './profile-settings/profile-img/ProfileImg';
import NavbarProfile from './profile-navbar/ProfileNavbar';
import ProfilePortfolio from './profile-portfolio/ProfilePortfolio';
import ProfilePosts from './profile-posts/ProfilePosts';
import ProfileLikes from './profile-likes/ProfileLikes';
import SignOutButton from '../sign-out/SignOut';
import { withAuthorization } from '../session'; //must be logged in to see content
import ProfileSvg from '../svgs/ProfileSvg';

import { useSelector } from 'react-redux';

const Profile = () => {
    const ProfileImgReducer = useSelector((state) => state.ProfileImgReducer);

    const history = useHistory();

    const [navpath, setNavPath] = useState('portfolio');

    const redirect = () => {
        console.log('REDIRECT ME');
        history.push('/');
    };

    return (
        <>
            <ContentWrapper>
                <div>
                    {ProfileImgReducer ? (
                        <ProfileImg img={ProfileImgReducer} />
                    ) : (
                        <ProfileSvg className="profile-avatar-svg" />
                    )}
                    {/*     <ProfileImg />
                    <ProfileSvg className="profile-avatar-svg" /> */}
                    <BtnsWrapper>
                        <SignOutButton />
                        <ProfileSettingsBtn to={ROUTES.PROFILE_SETTINGS}>
                            <i class="fas fa-cog"></i> Profile Settings
                        </ProfileSettingsBtn>
                    </BtnsWrapper>
                </div>
                <NavbarProfile />
            </ContentWrapper>
        </>
    );
};
const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(Profile); //check to see if you are signed in
