import React, { useState } from 'react';
import { CardWrapper } from './StockCardElements';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { chosenShare } from '../../../../redux/actions';

let chosenShareArray = [];

const StockCard = ({ name, cost, percent, fav, stocksList }) => {
    const dispatch = useDispatch();

    const setChosenStockOption = (name) => {
        let filterName = name.trim();
        chosenShareArray = stocksList.filter(function (item) {
            return item.symbol === filterName;
        });
        dispatch(chosenShare(chosenShareArray));
    };

    return (
        <CardWrapper id={name}>
            {/* <span>⭐</span> */}
            <span>{name}</span>
            <span>{cost.toFixed(2)} $</span>
            <span>{percent.toFixed(2)}%</span>
            <Link to="/info">
                <span onClick={() => setChosenStockOption(name)}>info</span>
            </Link>
        </CardWrapper>
    );
};

export default StockCard;
