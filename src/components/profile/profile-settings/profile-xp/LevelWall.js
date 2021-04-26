import React, { useContext, useEffect, useState } from 'react';
import BackButton from '../../../shared/button/back-button/BackButton';
import { ContentWrapper } from '../edit-profile/EditProfileElements';
import ProgressBar from './progress-bar/progressbar.component';
import FirebaseContext from '../../../firebase/context';

const LevelWall = () => {
    const firebase = useContext(FirebaseContext);

    const userData = JSON.parse(localStorage.getItem('authUser'));
    const [percent, setPercent] = useState(0);
    const testData = [{ bgcolor: '#6a1b9a', completed: percent + '%' }];
    useEffect(() => {
        /*     let data = firebase.curretUserData(); */
        /*         console.log(data); */

        firebase.user(userData.uid).on('value', (snapshot) => {
            const data = snapshot.val();
            setPercent(data.levelPercent);
        });
    }, []);
    return (
        <ContentWrapper>
            <BackButton />
            <div className="topbar-wrapper">
                <h3>Level System</h3>
            </div>
            <div className="user-info">
                {testData.map((item, index) => (
                    <ProgressBar
                        key={index}
                        bgcolor={item.bgcolor}
                        completed={item.completed}
                    />
                ))}
            </div>
        </ContentWrapper>
    );
};

export default LevelWall;
