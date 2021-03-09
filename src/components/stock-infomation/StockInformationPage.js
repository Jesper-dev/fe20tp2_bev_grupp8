import React, { useState, useEffect } from 'react';
import LineChart from '../charts/InfopageLinechart';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setFollowing } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import { ContentWrapper } from './StockInfromationElements';
let following = [];
const StockInformationPage = () => {
    const [checked, setChecked] = useState(false);
    const chosenShare = useSelector((state) => state.ChosenShare);
    const dispatch = useDispatch();
    const followingArr = useSelector((state) => state.Following);

    useEffect(() => {
        if (followingArr.includes(chosenShare[0])) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, []);

    const onFollow = () => {
        if (followingArr.includes(chosenShare[0])) {
            let name = chosenShare[0].symbol;
            setChecked(false);
            let index = followingArr.findIndex((x) => x.symbol == name);

            console.log(index);
            followingArr.splice(index, 1);
            dispatch(setFollowing(followingArr));
        } else {
            following.push(chosenShare[0]);
            dispatch(setFollowing(following));
            setChecked(true);
        }
    };
    console.log(following);
    const onChange = (e) => {
        setChecked(!checked);
    };

    return (
        <ContentWrapper>
            {chosenShare.map((item, index) => {
                return (
                    <div key={index}>
                        <h1>{item.shortName}</h1>
                        <LineChart />
                        <div className="buttonWrapper">
                            <button style={{ backgroundColor: 'green' }}>
                                BUY
                            </button>
                            <button style={{ backgroundColor: 'red' }}>
                                SELL
                            </button>
                        </div>
                        <span>⭐</span>
                        <label>
                            <input
                                type="checkbox"
                                onClick={onFollow}
                                checked={checked}
                                onChange={onChange}
                            />
                            FOLLOW {/* <span>FOLLOW</span> */}
                        </label>
                        <p>{item.symbol}</p>
                        <p>Market price: {item.regularMarketPrice} $</p>
                        <p>
                            Reg market change:{' '}
                            {item.regularMarketChange.toFixed(2)}%
                        </p>
                        <p>
                            Market change percent:{' '}
                            {item.regularMarketChangePercent.toFixed(2)}%
                        </p>
                    </div>
                );
            })}
        </ContentWrapper>
    );
};

export default StockInformationPage;
