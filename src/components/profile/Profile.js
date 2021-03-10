import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import {
    Switch,
    Route
  } from "react-router-dom";

import { ContentWrapper, ProfileSettingsBtn } from './ProfileElements'

import ProfileImg from './profile-img/ProfileImg'
import NavbarProfile from './profile-navbar/ProfileNavbar'
import ProfilePortfolio from './profile-portfolio/ProfilePortfolio'
import ProfilePosts from './profile-posts/ProfilePosts'
import ProfileLikes from './profile-likes/ProfileLikes'
import SignOutButton from '../sign-out/SignOut';
import { withAuthorization } from '../session'; //must be logged in to see content
import ProfileSvg from '../svgs/ProfileSvg'

const Profile = () => {
    const history = useHistory();

    const [navpath, setNavPath] = useState('portfolio')

    const redirect = () => {
        console.log('REDIRECT ME');
        history.push('/');
    };




    return (
        <>
        <ContentWrapper>
            <div>
               {/*  <ProfileImg /> */}
                <ProfileSvg className="profile-avatar-svg" />
                <ProfileSettingsBtn to={ROUTES.PROFILE_SETTINGS}><i class="fas fa-cog"></i> Profile Settings</ProfileSettingsBtn>
                <SignOutButton />
            </div>
            <NavbarProfile />
        {/* <Switch>

        </Switch> */}
            {/* <ProfilePosts />
            <ProfilePortfolio />
            <ProfileLikes /> */}

     </ContentWrapper>

        </>
    );
};
const condition = authUser => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(Profile); //check to see if you are signed in
