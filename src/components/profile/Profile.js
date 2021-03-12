import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import axios from "axios"

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

let user = ''

const Profile = () => {
    const ProfileImgReducer = useSelector((state) => state.ProfileImgReducer);
    const [userData, setUserData] = useState(undefined)
    const [username, setUsername] = useState(undefined)

    const history = useHistory();

    const [navpath, setNavPath] = useState('portfolio');

    const redirect = () => {
        console.log('REDIRECT ME');
        history.push('/');
    };

    useEffect(() => {
        user = localStorage.getItem('authUser')

        setUsername(JSON.parse(user).username)

    }, []);

    return (
        <>
            <ContentWrapper>
                <div>
                    {ProfileImgReducer ? (
                        <ProfileImg img={ProfileImgReducer} />
                    ) : (
                        <ProfileSvg className="profile-avatar-svg" />
                    )}
                    <p>{username}</p>

                    <BtnsWrapper>
                        <SignOutButton />
                        <ProfileSettingsBtn to={ROUTES.PROFILE_SETTINGS}>
                            <i className="fas fa-user-edit"></i> Edit Profile
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
