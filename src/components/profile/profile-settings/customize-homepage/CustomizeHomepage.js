import React, { useState, useEffect, useCallback, useContext } from 'react';

import { ContentWrapper } from './CustomizeHomepageElements';

import { FirebaseContext } from '../../../firebase/context';

const CustomizeHomepage = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const [checkedRec, setCheckedRec] = useState(true);
    const [checkedWatchCryptos, setCheckedWatchCryptos] = useState(true);
    const [checkedWatchSecuritys, setCheckedWatchSecuritys] = useState(true);
    const [checkedNews, setCheckedNews] = useState(true);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        getDataDB();
    }, []);

    const getDataDB = () => {
        firebase
            .user(user.uid)
            .child('/userSettings/settings')
            .once('value', (snapshot) => {
                const data = snapshot.val();
                data.watchingCryptos
                    ? setCheckedWatchCryptos(true)
                    : setCheckedWatchCryptos(false);
                data.watchingSecuritys
                    ? setCheckedWatchSecuritys(true)
                    : setCheckedWatchSecuritys(false);
                data.news ? setCheckedNews(true) : setCheckedNews(false);
                data.recommended ? setCheckedRec(true) : setCheckedRec(false);
            });
    };

    const updateDB = (path, value, state) => {
        if (value === 'Rec') {
            firebase.user(user.uid).child(path).update({
                recommended: !state,
            });
        } else if (value === 'WatchCryptos') {
            firebase.user(user.uid).child(path).update({
                watchingCryptos: !state,
            });
        } else if (value === 'WatchSecuritys') {
            firebase.user(user.uid).child(path).update({
                watchingSecuritys: !state,
            });
        } else if (value === 'News') {
            firebase.user(user.uid).child(path).update({
                news: !state,
            });
        }
    };

    const seeFunc = (e) => {
        if (e.target.value === 'Rec') {
            updateDB('/userSettings/settings', 'Rec', checkedRec);
        } else if (e.target.value === 'WatchCryptos') {
            updateDB(
                '/userSettings/settings',
                'WatchCryptos',
                checkedWatchCryptos
            );
        } else if (e.target.value === 'WatchSecuritys') {
            updateDB(
                '/userSettings/settings',
                'WatchSecuritys',
                checkedWatchSecuritys
            );
        } else if (e.target.value === 'News') {
            updateDB('/userSettings/settings', 'News', checkedNews);
        }
    };

    const onChange = (e) => {
        if (e.target.value === 'Rec') {
            setCheckedRec(!checkedRec);
        } else if (e.target.value === 'WatchCryptos') {
            setCheckedWatchCryptos(!checkedWatchCryptos);
        } else if (e.target.value === 'WatchSecuritys') {
            setCheckedWatchSecuritys(!checkedWatchSecuritys);
        } else if (e.target.value === 'News') {
            setCheckedNews(!checkedNews);
        }
    };
    return (
        <ContentWrapper>
            <h3>Customize your homepage</h3>
            {/* NOTE: Change whole div to only a label with an input */}
            <div className="tgl">
                <p>Show Recommended</p>
                <input
                    type="checkbox"
                    id="rec"
                    className="checkbox"
                    onChange={onChange}
                    checked={checkedRec}
                    onClick={seeFunc}
                    value="Rec"
                />
                <label htmlFor="rec" className="toggle-btn"></label>
            </div>
            <div className="tgl">
                <p>Show Watching Cryptos</p>
                <input
                    type="checkbox"
                    id="followCrypto"
                    className="checkbox"
                    onChange={onChange}
                    checked={checkedWatchCryptos}
                    onClick={seeFunc}
                    value="WatchCryptos"
                />
                <label htmlFor="followCrypto" className="toggle-btn"></label>
            </div>
            <div className="tgl">
                <p>Show Watching Securitys</p>
                <input
                    type="checkbox"
                    id="followCryptoSecuritys"
                    className="checkbox"
                    onChange={onChange}
                    checked={checkedWatchSecuritys}
                    onClick={seeFunc}
                    value="WatchSecuritys"
                />
                <label
                    htmlFor="followCryptoSecuritys"
                    className="toggle-btn"
                ></label>
            </div>
            <div className="tgl">
                <p>Show News</p>
                <input
                    type="checkbox"
                    id="news"
                    className="checkbox"
                    onChange={onChange}
                    checked={checkedNews}
                    onClick={seeFunc}
                    value="News"
                />
                <label htmlFor="news" className="toggle-btn"></label>
            </div>
        </ContentWrapper>
    );
};

export default CustomizeHomepage;
