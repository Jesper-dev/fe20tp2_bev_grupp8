import React, { useEffect, useState, useContext } from 'react';

import ProfileImgChoose from '../profile-img/ProfileChooseImg';

import { ContentWrapper } from './EditProfileElements';
/* import { ReusabelInputField } from '../../../shared/reusable-elements/ReusableElements' */
import { ButtonPrimary } from '../../../shared/button/ButtonElements';
import { ButtonWrapper } from '../ProfileSettingsElements';
import SignOutButton from '../../../sign-out/SignOut';

import { fetchUserSnapshotObject } from '../../../shared/functions/firebase-functions';
import { FirebaseContext } from '../../../firebase/context';

import * as ROUTES from '../../../../constants/routes';
const EditProfile = () => {
    const userData = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const [data, setData] = useState(null);

    const deleteAccount = () => {
        const userId = firebase.auth.currentUser.uid;
        const userRef = firebase.user(userId);

        if (
            window.confirm(
                'Are your sure you want to delete your account? This action is non-reversible, and all your data will be deleted.'
            )
        ) {
            userRef
                .remove()
                .then(() => {
                    console.log('User data removed!');
                    firebase.auth.currentUser
                        .delete()
                        .then(() => console.log('User authentication deleted'))
                        .catch((error) =>
                            console.log(`Failed: ${error.message}`)
                        );
                    window.location.replace(ROUTES.LANDING);
                    window.localStorage.clear();
                })
                .catch((error) => {
                    console.log(`User data removal failed: ${error.message}`);
                });
        }
    };

    useEffect(() => {
        fetchUserSnapshotObject(firebase, userData.uid, '', setData);
        console.log(data);
    }, []);

    console.log(data);
    return (
        <ContentWrapper>
            <div className="topbar-wrapper">
                <h3>Edit Profile</h3> <SignOutButton />
            </div>
            {/* NOTE: Change whole div to only a label with an input */}
            <hr />
            <div className="user-info">
                {!data ? null : (
                    <>
                        <div className="topbar-wrapper">
                            <h4>Personal information</h4>
                            <button
                                className="delete-account-btn "
                                onClick={deleteAccount}
                            >
                                Delete account
                            </button>
                        </div>
                        <hr />
                        <label>
                            Username
                            <input disabled value={data.username} />
                        </label>
                        <label>
                            Email
                            <input disabled value={data.email} />
                        </label>
                        <label>
                            Organization
                            {data.organization ? (
                                <input disabled value={data.organization} />
                            ) : (
                                <input disabled value={'No organization'} />
                            )}
                        </label>

                        <label>
                            Bio
                            <textarea disabled value={data.bio} />
                        </label>
                        <ProfileImgChoose />
                    </>
                )}
            </div>
        </ContentWrapper>
    );
};

export default EditProfile;
