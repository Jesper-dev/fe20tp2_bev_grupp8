import React, { useState, useEffect, useCallback, useContext } from 'react';

import { ContentWrapper } from './CustomizeHomepageElements';

import { FirebaseContext } from '../../../firebase/context';

import BackButton from '../../../shared/button/back-button/BackButton';

const CustomizeHomepage = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const [checkedRec, setCheckedRec] = useState(true);
    const [checkedWatchCryptos, setCheckedWatchCryptos] = useState(true);
    const [checkedWatchSecuritys, setCheckedWatchSecuritys] = useState(true);
    const [checkedNews, setCheckedNews] = useState(true);
    const [checkedHottestC, setCheckedHottestC] = useState(true);
    const [checkedHottestS, setCheckedHottestS] = useState(true);
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
                data.hottestCrypto
                    ? setCheckedHottestC(true)
                    : setCheckedHottestC(false);
                data.hottestStocks
                    ? setCheckedHottestS(true)
                    : setCheckedHottestS(false);
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
        } else if (value === 'hottestC') {
            firebase.user(user.uid).child(path).update({
                hottestCrypto: !state,
            });
        } else if (value === 'hottestS') {
            firebase.user(user.uid).child(path).update({
                hottestStocks: !state,
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
        } else if (e.target.value === 'hottestcrypto') {
            updateDB('/userSettings/settings', 'hottestC', checkedHottestC);
        } else if (e.target.value === 'hotteststocks') {
            updateDB('/userSettings/settings', 'hottestS', checkedHottestS);
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
        } else if (e.target.value === 'hottestcrypto') {
            setCheckedHottestC(!checkedHottestC);
        } else if (e.target.value === 'hotteststocks') {
            setCheckedHottestS(!checkedHottestS);
        }
    };
    return (
        <ContentWrapper>
            <BackButton />
            <h3>Customize Application</h3>
            {/* NOTE: Change whole div to only a label with an input */}
            <hr />

            <div className="home-wrapper">
                <h4>Homepage</h4>
                <hr />
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
                    <label
                        htmlFor="followCrypto"
                        className="toggle-btn"
                    ></label>
                </div>
                <div className="tgl">
                    <p>Show Watching Securites</p>
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
                <div className="tgl">
                    <p>Hottest Cryptocurrencies</p>
                    <input
                        type="checkbox"
                        id="hottestcrypto"
                        className="checkbox"
                        onChange={onChange}
                        checked={checkedHottestC}
                        onClick={seeFunc}
                        value="hottestcrypto"
                    />
                    <label
                        htmlFor="hottestcrypto"
                        className="toggle-btn"
                    ></label>
                </div>
                <div className="tgl">
                    <p>Hottest Securites</p>
                    <input
                        type="checkbox"
                        id="hotteststocks"
                        className="checkbox"
                        onChange={onChange}
                        checked={checkedHottestS}
                        onClick={seeFunc}
                        value="hotteststocks"
                    />
                    <label
                        htmlFor="hotteststocks"
                        className="toggle-btn"
                    ></label>
                </div>
            </div>
        </ContentWrapper>
    );
};

export default CustomizeHomepage;
