import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import axios from "axios"

import { FirebaseContext } from '../firebase/context'
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

import { useSelector, useDispatch } from 'react-redux';
import { setProfileImage, setUsers } from '../../redux/actions';

let user = ''

const Profile = () => {

    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    const [image, setImage] = useState(null)
    const [username, setUsername] = useState('')


    const ProfileImgReducer = useSelector((state) => state.ProfileImgReducer);
    const history = useHistory();

    const [navpath, setNavPath] = useState('portfolio');

    const redirect = () => {
        console.log('REDIRECT ME');
        history.push('/');
    };

    const userData = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        // const theUserId = firebase.auth.currentUser.uid;
        // console.log(`THE USER ID --> ${theUserId}`);

        const user = firebase.db.ref('users/' + userData.uid);
        user.on('value', (snapshot) => {
            const data = snapshot.val();
            setUsername(data.username)
            setImage(data.picture.profile_pic)
            let blobLink = data.picture.profile_pic;
            dispatch(setProfileImage(blobLink))
        });

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
