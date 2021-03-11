import React, { useState, useEffect } from 'react';
import {
    setSeeRecommendations,
    setSeeFollowing,
    setSeeNews,
} from '../../../../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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
        if (SeeRecRedux == true) {
            setCheckedRec(true);
        } else if (SeeRecRedux == false) {
            setCheckedRec(false);
        }
    };

    const checkIfFollow = () => {
        if (SeeFollowingRedux == true) {
            setCheckedFollow(true);
        } else if (SeeFollowingRedux == false) {
            setCheckedFollow(false);
        }
    };

    const checkIfNews = () => {
        if (SeeNewsRedux == true) {
            setCheckedNews(true);
        } else if (SeeNewsRedux == false) {
            setCheckedNews(false);
        }
    };

    const seeFunc = (e) => {
        if (e.target.value == 'Rec') {
            dispatch(setSeeRecommendations(!SeeRecRedux));
        } else if (e.target.value == 'Follow') {
            dispatch(setSeeFollowing(!SeeFollowingRedux));
        } else if (e.target.value == 'News') {
            dispatch(setSeeNews(!SeeNewsRedux));
        }
    };

    const onChange = (e) => {
        if (e.target.value == 'Rec') {
            setCheckedRec(!checkedRec);
        } else if (e.target.value == 'Follow') {
            setCheckedFollow(!checkedFollow);
        } else if (e.target.value == 'News') {
            setCheckedNews(!checkedNews);
        }
    };
    return (
        <div className="customizeWrapper">
            <h3>Customize your homepage</h3>
            <div>
                <label>Recommendations</label>
                <input
                    type="checkbox"
                    onChange={onChange}
                    checked={checkedRec}
                    onClick={seeFunc}
                    value="Rec"
                />
            </div>
            <div>
                <label>Following</label>
                <input
                    type="checkbox"
                    onChange={onChange}
                    checked={checkedFollow}
                    onClick={seeFunc}
                    value="Follow"
                />
            </div>
            <div>
                <label>News</label>
                <input
                    type="checkbox"
                    onChange={onChange}
                    checked={checkedNews}
                    onClick={seeFunc}
                    value="News"
                />
            </div>
        </div>
    );
};

export default CustomizeHomepage;
