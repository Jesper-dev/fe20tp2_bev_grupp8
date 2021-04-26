import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../firebase/context';

const AchievmentsBoard = () => {
    const firebase = useContext(FirebaseContext);
    const [achData, setAchData] = useState({});
    const [loading, setLoading] = useState(true);
    const userData = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        firebase
            .user(userData.uid)
            .child('/achievments')
            .once('value', (snapshot) => {
                if (!snapshot.val()) return;
                setAchData(snapshot.val());
            });

        return () => {
            setLoading(false);
        };
    }, []);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {achData.millionaire.show ? (
                        <p>{achData.millionaire.name}</p>
                    ) : null}
                    {achData.bitcoin.show ? (
                        <p>{achData.bitcoin.name}</p>
                    ) : null}
                    {achData.dogecoin.show ? (
                        <p>{achData.dogecoin.name}</p>
                    ) : null}
                </div>
            )}
        </>
        // </div>
    );
};

export default AchievmentsBoard;
