import React, { useContext } from 'react';
import { ContentWrapper } from './ProfileSettingsElements';

import ProfileImgChoose from './profile-img/ProfileChooseImg';
import CustomizeHomepage from './customize-homepage/CustomizeHomepage';
import SignOutButton from '../../sign-out/SignOut';

import * as ROUTES from '../../../constants/routes';
import { FirebaseContext } from '../../firebase/context';

const ProfileSettings = () => {
    const firebase = useContext(FirebaseContext);

    const deleteAccount = () => {
        const userId = firebase.auth.currentUser.uid;
        const userRef = firebase.db.ref('users/' + userId);

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

    return (
        <>
            <ContentWrapper>
                <h1>Profile Settings</h1>
                <ProfileImgChoose />
                <CustomizeHomepage />
                <div>
                    <SignOutButton />
                    <button onClick={deleteAccount}>DELETE ACCOUNT</button>
                </div>
            </ContentWrapper>
        </>
    );
};

export default ProfileSettings;
