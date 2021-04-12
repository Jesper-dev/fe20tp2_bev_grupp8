import React, { useState, useEffect, useContext } from 'react';
import { Route } from 'react-router';
import Picker, {
    SKIN_TONE_NEUTRAL,
    SKIN_TONE_LIGHT,
    SKIN_TONE_MEDIUM_LIGHT,
} from 'emoji-picker-react';
import * as ROUTES from '../../constants/routes';

import ProfilePortfolio from './profile-portfolio/ProfilePortfolio';
import ProfileWall from './profile-wall/ProfileWall';
import ProfileDashboard from './profile-dashboard/ProfileDashboard';
import { fetchUserSnapshotObject } from '../shared/functions/firebase-functions';

import { FirebaseContext } from '../firebase/context';
import { withAuthorization } from '../session';
import { GenericVestBtn } from '../shared/button/ButtonElements';
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
    const [followerCount, setFollowerCount] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [showEmoji, setShowEmoji] = useState(false);

    const ProfileImgReducer = useSelector((state) => state.ProfileImgReducer);

    const userData = JSON.parse(localStorage.getItem('authUser'));

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        let emoji;
        console.log(emojiObject);
        if (emojiObject.activeSkinTone == undefined) {
            emoji = {
                activeSkinTone: 'neutral',
                emoji: emojiObject.emoji,
                names: emojiObject.names,
                originalUnified: emojiObject.originalUnified,
                unified: emojiObject.unified,
            };

            firebase.user(userData.uid).child('/').update({
                emoji: emoji,
            });
        } else {
            firebase.user(userData.uid).child('/').update({
                emoji: emojiObject,
            });
        }
        setShowEmoji(false);
    };

    useEffect(() => {
        // const theUserId = firebase.auth.currentUser.uid;
        // console.log(`THE USER ID --> ${theUserId}`);
        fetchUserSnapshotObject(
            firebase,
            userData.uid,
            '/emoji',
            setChosenEmoji
        );

        const user = firebase.user(userData.uid);
        user.on('value', (snapshot) => {
            const data = snapshot.val();
            setFollowerCount(data.followerCount);
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
                        {ProfileImgReducer == 'null' ? (
                            <ProfileSvg
                                className="profile-avatar-svg"
                                fillColor="var(--clr-primary)"
                            />
                        ) : (
                            <ProfileImg img={ProfileImgReducer} />
                        )}

                        <span>{username}</span>
                        {chosenEmoji ? <span>{chosenEmoji.emoji}</span> : ''}
                        <GenericVestBtn
                            onClick={() => setShowEmoji(!showEmoji)}
                            pad={'8px'}
                            border={'1px solid var(--clr-primary)'}
                            br={'10px'}
                            bg={'none'}
                            co={'var(--clr-primary)'}
                        >
                            {showEmoji ? 'Mood (close)' : 'Mood (open)'}
                        </GenericVestBtn>
                    </div>
                    <div
                        className="emoji-picker-wrapper"
                        style={
                            showEmoji
                                ? { display: 'flex' }
                                : { display: 'none' }
                        }
                    >
                        <Picker
                            onEmojiClick={onEmojiClick}
                            groupVisibility={{
                                symbols: false,
                                objects: false,
                                activities: false,
                                travel_places: false,
                                animals_nature: false,
                                food_drink: false,
                                recently_used: false,
                            }}
                        />
                    </div>

                    <div className="btn-and-wollower-wrapper">
                        <div className="follow-info-wrapper">
                            <div className="followers-wrapper">
                                <span>
                                    {' '}
                                    {followerCount > 0 ? followerCount : 0}{' '}
                                </span>
                                <span>Followers</span>
                            </div>

                            <div className="followers-wrapper">
                                <span>
                                    {' '}
                                    {followerCount > 0 ? followerCount : 0}{' '}
                                </span>
                                <span>Following</span>
                            </div>
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
                    </div>
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
