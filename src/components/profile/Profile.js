import React, { useState, useEffect, useContext } from 'react';
import { Route } from 'react-router';
import * as ROUTES from '../../constants/routes';

import ProfilePortfolio from './profile-portfolio/ProfilePortfolio';
import ProfileWall from './profile-wall/ProfileWall';
import ProfileDashboard from './profile-dashboard/ProfileDashboard';

import { FirebaseContext } from '../firebase/context';
import { withAuthorization } from '../session';
import ContentWrapper from '../shared/wrappers/ContentWrapper';
import {
    HeaderWrapper,
    MainWrapper,
    ProfileSettingsBtn,
} from './ProfileElements';
import TabBar from '../shared/tab-bar/TabBar';

import ProfileImg from './profile-settings/profile-img/ProfileImg';
import ProfileSvg from '../svgs/ProfileSvg';

import { useSelector, useDispatch } from 'react-redux';
import { setProfileImage } from '../../redux/actions';

const Profile = () => {
    const firebase = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const ProfileImgReducer = useSelector((state) => state.ProfileImgReducer);

    const userData = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        // const theUserId = firebase.auth.currentUser.uid;
        // console.log(`THE USER ID --> ${theUserId}`);

        const user = firebase.user(userData.uid);
        user.on('value', (snapshot) => {
            const data = snapshot.val();
            setUsername(data.username);
                        if (!data.picture) return;

            let blobLink = data.picture.profile_pic;
            dispatch(setProfileImage(blobLink));
                if (!data.roles) return;
            data.roles.ADMIN ? setIsAdmin(true) : setIsAdmin(false);

        });
    }, [dispatch, firebase, userData.uid]); //varning!

    const tabs = [
        {
            label: 'Portfolio',
            link: ROUTES.PROFILE,
        },
        {
            label: 'Wall',
            link: ROUTES.PROFILE_WALL,
        },
        {
            label: 'Dashboard',
            link: ROUTES.PROFILE_DASHBOARD,
        },
    ];

    return (
        <ContentWrapper>
            <HeaderWrapper>
                <section>
                    <div>
                        {ProfileImgReducer == "null" ? (
                            <ProfileSvg className="profile-avatar-svg" fillColor="var(--clr-primary)"/>
                        ) : (
                            <ProfileImg img={ProfileImgReducer} /> 
                        )}
                        <span>{username}</span>
                    </div>
                    <ProfileSettingsBtn to={ROUTES.PROFILE_SETTINGS}>
                        <i className="fas fa-user-edit"></i>
                        Edit Profile
                    </ProfileSettingsBtn>
                    {isAdmin ? (
                        <ProfileSettingsBtn to={ROUTES.ADMIN_SETTINGS}>
                            <i className="fas fa-user-shield"></i>
                            Edit Organization
                        </ProfileSettingsBtn>
                    ) : (
                        ''
                    )}
                </section>
                <TabBar tabs={tabs} />
            </HeaderWrapper>
            <MainWrapper>
                <Route
                    exact
                    path={ROUTES.PROFILE}
                    component={ProfilePortfolio}
                />
                <Route
                    exact
                    path={ROUTES.PROFILE_WALL}
                    component={ProfileWall}
                />
                <Route
                    exact
                    path={ROUTES.PROFILE_DASHBOARD}
                    component={ProfileDashboard}
                />
            </MainWrapper>
        </ContentWrapper>
    );
};
const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(Profile); //check to see if you are signed in
