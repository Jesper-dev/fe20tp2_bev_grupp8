import React, { useState, useEffect, useContext } from 'react';
import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../firebase/context'
import { withAuthorization } from '../session';

import { ContentWrapper, ProfileSettingsBtn } from './ProfileElements';

import ProfileImg from './profile-settings/profile-img/ProfileImg';
import ProfileSvg from '../svgs/ProfileSvg';
import NavbarProfile from './profile-navbar/ProfileNavbar';

import { useSelector, useDispatch } from 'react-redux';
import { setProfileImage } from '../../redux/actions';


const Profile = () => {
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')

    const ProfileImgReducer = useSelector((state) => state.ProfileImgReducer);

    const userData = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        // const theUserId = firebase.auth.currentUser.uid;
        // console.log(`THE USER ID --> ${theUserId}`);

        const user = firebase.user(userData.uid);
        user.on('value', (snapshot) => {
            const data = snapshot.val();
            setUsername(data.username)
            if (!data.picture) return
            // setImage(data.picture.profile_pic)
            let blobLink = data.picture.profile_pic;
            dispatch(setProfileImage(blobLink))
        });
    }, []); //varning!

    return (
        <>
            <ContentWrapper>
                <header>
                    <section>
                        <div className="user-info">
                            {ProfileImgReducer ? (
                                <ProfileImg img={ProfileImgReducer} />
                            ) : (
                                <ProfileSvg className="profile-avatar-svg" />
                            )}
                            <span>{username}</span>
                        </div>
                        <ProfileSettingsBtn to={ROUTES.PROFILE_SETTINGS}>
                            <i className="fas fa-user-edit"></i>
                            Edit Profile
                        </ProfileSettingsBtn>
                    </section>
                <NavbarProfile />
                </header>
            </ContentWrapper>
        </>
    );
};
const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(Profile); //check to see if you are signed in
