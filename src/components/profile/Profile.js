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
import AchievmentsBoard from './profile-achievments/AchievmentsBoard';
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
    const [userInfo, setUserInfo] = useState({});
    const [millionaire, setMillionaire] = useState(false);
    const [bitcoin, setBitcoin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [followerCount, setFollowerCount] = useState(false);
    const [followingCount, setFollowingCount] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [showEmoji, setShowEmoji] = useState(false);

    const ProfileImgReducer = useSelector((state) => state.ProfileImgReducer);

    const userData = JSON.parse(localStorage.getItem('authUser'));

    const checkUser = (currency, arr) => {
        let list = [];
        if (currency >= 100000000) {
            // setMillionaire(true);
            firebase.user(userData.uid).child('/achievments/millionaire').update({
                done: true,
            });
        }

        for (const key in arr) {
            list.push({ ...arr[key] });
        }
        list.forEach((item) => {
            if (item.symbol === 'btc') {
                if (item.amount >= 5) {
                    // setBitcoin(true);
                    firebase.user(userData.uid).child('/achievments/bitcoin').update({
                        done: true,
                    });
                }
            }
        });
    };

    const checkFollowingCount = (arr) => {
        let list = [];
        for (const key in arr) {
            list.push({ ...arr[key] });
        }
        setFollowingCount(list.length);
    };

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
            checkFollowingCount(data.following);
            setUsername(data.username);
            setUserInfo(data);
            if (!data.picture) return;
            checkUser(data.currency.currency, data.possessionCrypto);
            let blobLink = data.picture.profile_pic;
            dispatch(setProfileImage(blobLink));
            if (!data.roles) return;
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
                    <div style={{gap: '0.3rem'}}>
                        <h2>{username}</h2>
                        {chosenEmoji ? (
                            <span
                                className="emoji"
                                onClick={() => setShowEmoji(!showEmoji)}
                            >
                                {chosenEmoji.emoji}
                            </span>
                        ) : (
                            <span>+</span>
                        )}
                    </div>
                    <div className="main-wrapper">
                    <div>
                        {ProfileImgReducer == 'null' ? (
                            <ProfileSvg
                                className="profile-avatar-svg"
                                fillColor="var(--clr-primary)"
                            />
                        ) : (
                            <ProfileImg img={ProfileImgReducer} />
                        )}


                    </div>
                    <div className="follower-wrapper">
                        <div>
                            <p>{followerCount > 0 ? followerCount : 0}</p>
                            <span>Followers</span>
                        </div>
                        <div>
                            <p>{followingCount > 0 ? followingCount : 0}</p>
                            <span>Following</span>

                        </div>
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
                            preload={true}
                        ></Picker>

                    </div>

                    {/* <div className="btn-and-follower-wrapper">


                    </div> */}
                    <div className="btn-wrapper">
                            <ProfileSettingsBtn to={ROUTES.PROFILE_SETTINGS}>
                                <i className="fas fa-user-edit"></i>
                                Edit Profile
                            </ProfileSettingsBtn>
                        </div>
                    </div>
                    <AchievmentsBoard />
                    {/* <div className="achievments-wrapper">
                        <p>
                            {millionaire ? (
                               'Selfmade Millionaire'
                            ) : (
                                ''
                            )}
                        </p>
                        <p>
                            {bitcoin ? (
                                <p>Bitcoin Enthusiast</p>
                            ) : (
                                ''
                            )}
                        </p>
                    </div> */}

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
