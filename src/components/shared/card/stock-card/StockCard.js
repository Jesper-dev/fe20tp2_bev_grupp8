import React from 'react';
import { CardWrapper } from './StockCardElements';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { chosenShare } from '../../../../redux/actions';


let chosenShareArray = [];

const StockCard = ({ name, cost, percent, fav, stocksList, amount }) => {
    const dispatch = useDispatch();
    const setChosenStockOption = (name) => {
        let filterName = name.trim();
        chosenShareArray = stocksList.filter(function (item) {
            return item.symbol === filterName;
        });

        // if (chosenShareArray[0].symbol === 'RBLX') {
        //     return null;
        // }
        dispatch(chosenShare(chosenShareArray));
    };

    return (
        <CardWrapper id={name}>
            {/* <span>⭐</span> */}
            {!amount ? '' : <span>{amount} <i className="fas fa-piggy-bank" style={{ color: 'pink'}}></i></span>}
            <span>{name}</span>
            <span>{cost ? cost.toFixed(2) : 20} $</span>
            
            <span
                style={
                    percent > 0 ? { color: 'var(--lighter-green)' } : { color: 'var(--lighter-red)' }
                }
            >
                {percent ? percent.toFixed(2) : 20}%
            </span>
            <Link to="/info">
                <span onClick={() => setChosenStockOption(name)}>
                    <i className="fas fa-caret-right"></i>
                </span>
            </Link>
        </CardWrapper>
    );
};

export default StockCard;
