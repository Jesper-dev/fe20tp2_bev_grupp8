import React from 'react';
import { CardWrapper } from './StockCardSmallElements';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import UsFlag from '../../../svgs/flags/America';

const StockCardSmall = ({ name, cost, percent, amount, i }) => {
    let history = useHistory();
    const setChosenStockOption = (name) => {
        history.push(`/info/${name}`);
    };
    /* 
    const CheckColor = () => {
        if (key % 2 == 0) return true;
        false;
    };

    let color = CheckColor(); */

    return (
        <CardWrapper i={i} id={name} onClick={() => setChosenStockOption(name)}>
            <UsFlag />
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
        </CardWrapper>
    );
};

export default StockCardSmall;
