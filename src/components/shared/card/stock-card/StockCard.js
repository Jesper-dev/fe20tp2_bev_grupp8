import React from 'react';
import { CardWrapper } from './StockCardElements';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { chosenShare } from '../../../../redux/actions';

import UsFlag from '../../../svgs/flags/America';

let chosenShareArray = [];

const StockCard = ({ name, cost, percent, fav, stocksList, amount }) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const setChosenStockOption = (name) => {
        /*         let filterName = name.trim();
            chosenShareArray = stocksList.filter(function (item) {
                return item.symbol === filterName;
            });
        dispatch(chosenShare(chosenShareArray)); */
        history.push(`/info/${name}`);
    };

    return (
        <CardWrapper id={name} onClick={() => setChosenStockOption(name)}>
            <UsFlag />
            {/* <span>⭐</span> */}
            {!amount ? (
                ''
            ) : (
                <span>
                    {amount}{' '}
                    <i
                        className="fas fa-piggy-bank"
                        style={{ color: 'pink' }}
                    ></i>
                </span>
            )}
            <span>{name}</span>
            <span>{cost ? cost.toFixed(2) : 20} $</span>

            <span
                style={
                    percent > 0
                        ? { color: 'var(--lighter-green)' }
                        : { color: 'var(--lighter-red)' }
                }
            >
                {percent ? parseFloat(percent).toFixed(2) : 0}%
            </span>
            <Link to={`/info/${name}`}>
                <span>
                    <i className="fas fa-caret-right"></i>
                </span>
            </Link>
            {/*  <Link to="/info">
                <span>
                    <i className="fas fa-caret-right"></i>
                </span>
            </Link> */}
        </CardWrapper>
    );
};

export default StockCard;
