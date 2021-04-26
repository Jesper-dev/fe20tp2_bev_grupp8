import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../firebase/context';

const AchievmentsBoard = () => {
    const firebase = useContext(FirebaseContext);
    const [loading, setLoading] = useState(false);
    const [achName, setAchName] = useState(false);
    const userData = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        setLoading(true);
        let list = [];
        firebase
            .user(userData.uid)
            .child('/achievments')
            .on('value', (snapshot) => {
                const data = snapshot.val();
                if (!data) return;
                for (const key in data) {
                    list.push(data[key]);
                }
                chooseAch(list);
            });

        return () => {
            setLoading(false);
        };
    }, [loading]);

    const chooseAch = (array) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].show === true) {
                setAchName(array[i].name);
                return;
            }
        }
    };

    return (
        <>
            {'' ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>{achName ? achName : ''}</p>
                </div>
            )}
        </>
    );
};

export default AchievmentsBoard;
