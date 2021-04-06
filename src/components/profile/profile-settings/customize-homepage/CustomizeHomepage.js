import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
    setSeeRecommendations,
    setSeeFollowing,
    setSeeNews,
} from '../../../../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { ContentWrapper } from './CustomizeHomepageElements'

import { FirebaseContext } from '../../../firebase/context';

const CustomizeHomepage = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const [checkedRec, setCheckedRec] = useState(true);
    const [checkedWatch, setCheckedWatch] = useState(true);
    const [checkedNews, setCheckedNews] = useState(true);
    const dispatch = useDispatch();
    const SeeRecRedux = useSelector((state) => state.SeeRecommendations);
    const SeeFollowingRedux = useSelector((state) => state.SeeFollowing);
    const SeeNewsRedux = useSelector((state) => state.SeeNews);
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        getDataDB()
    }, []);

    const getDataDB = () => {
        firebase.user(user.uid).child('/userSettings/settings').once('value', (snapshot) => {
            const data = snapshot.val()
            data.watching ? setCheckedWatch(true) : setCheckedWatch(false)
            data.news ? setCheckedNews(true) : setCheckedNews(false)
            data.recommended ? setCheckedRec(true) : setCheckedRec(false)
        })
    }


    const updateDB = (path, value, state) => {
        if(value === 'Rec'){
            firebase.user(user.uid).child(path).update({
                recommended: !state
            })
        }
        else if(value === 'Watch'){
            firebase.user(user.uid).child(path).update({
                watching: !state
            })
        }
        else if(value === 'News'){
            firebase.user(user.uid).child(path).update({
                news: !state
            })
        }
    }

    const seeFunc = (e) => {
        if (e.target.value === 'Rec') {
            updateDB('/userSettings/settings', 'Rec', checkedRec)
        } else if (e.target.value === 'Watch') {
            updateDB('/userSettings/settings', 'Watch', checkedWatch)
        } else if (e.target.value === 'News') {
            updateDB('/userSettings/settings', 'News', checkedNews)
        }
    };

    const onChange = (e) => {
        if (e.target.value === 'Rec') {
            setCheckedRec(!checkedRec);
        } else if (e.target.value === 'Watch') {
            setCheckedWatch(!checkedWatch);
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
                <p>Show Watching</p>
                <input
                    type="checkbox"
                    id="follow"
                    className="checkbox"
                    onChange={onChange}
                    checked={checkedWatch}
                    onClick={seeFunc}
                    value="Watch"
                />
                <label htmlFor="follow" className="toggle-btn"></label>
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
