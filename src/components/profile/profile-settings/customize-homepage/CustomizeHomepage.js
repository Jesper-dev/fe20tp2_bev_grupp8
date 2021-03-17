import React, { useState, useEffect } from 'react';
import {
    setSeeRecommendations,
    setSeeFollowing,
    setSeeNews,
} from '../../../../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { ContentWrapper } from './CustomizeHomepageElements'

const CustomizeHomepage = () => {
    const [checkedRec, setCheckedRec] = useState(true);
    const [checkedFollow, setCheckedFollow] = useState(true);
    const [checkedNews, setCheckedNews] = useState(true);
    const dispatch = useDispatch();
    const SeeRecRedux = useSelector((state) => state.SeeRecommendations);
    const SeeFollowingRedux = useSelector((state) => state.SeeFollowing);
    const SeeNewsRedux = useSelector((state) => state.SeeNews);

    useEffect(() => {
        checkIfRec();
        checkIfFollow();
        checkIfNews();
    }, []);

    const checkIfRec = () => {
        if (SeeRecRedux === true) {
            setCheckedRec(true);
        } else if (SeeRecRedux === false) {
            setCheckedRec(false);
        }
    };

    const checkIfFollow = () => {
        if (SeeFollowingRedux === true) {
            setCheckedFollow(true);
        } else if (SeeFollowingRedux === false) {
            setCheckedFollow(false);
        }
    };

    const checkIfNews = () => {
        if (SeeNewsRedux === true) {
            setCheckedNews(true);
        } else if (SeeNewsRedux === false) {
            setCheckedNews(false);
        }
    };

    const seeFunc = (e) => {
        if (e.target.value === 'Rec') {
            dispatch(setSeeRecommendations(!SeeRecRedux));
        } else if (e.target.value === 'Follow') {
            dispatch(setSeeFollowing(!SeeFollowingRedux));
        } else if (e.target.value === 'News') {
            dispatch(setSeeNews(!SeeNewsRedux));
        }
    };

    const onChange = (e) => {
        if (e.target.value === 'Rec') {
            setCheckedRec(!checkedRec);
        } else if (e.target.value === 'Follow') {
            setCheckedFollow(!checkedFollow);
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
                <p>Show Following</p>
                <input
                    type="checkbox"
                    id="follow"
                    className="checkbox"
                    onChange={onChange}
                    checked={checkedFollow}
                    onClick={seeFunc}
                    value="Follow"
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
