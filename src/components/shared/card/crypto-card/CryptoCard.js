import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { chosenCrypto } from '../../../../redux/actions';

import { CardWrapper } from './CryptoCardElements';

import Coin from '../../../svgs/Coin';

let chosenCryptoArray = [];

const CryptoCard = ({ name, price, img, percent, cryptoList }) => {
    const dispatch = useDispatch();
    let history = useHistory();

    const setChosenCryptoOption = (name) => {
        history.push(`/info/crypto/${name}`);
        let filterName = name.trim();
        chosenCryptoArray = cryptoList.filter(function (item) {
            return item.name === filterName;
        });

        dispatch(chosenCrypto(chosenCryptoArray));
    };

    let newName = name.substring(0, 3);
    let percentInt = parseFloat(percent);

    return (
        <>
            <CardWrapper onClick={() => setChosenCryptoOption(name)}>
                {img === 'LV-CrY' ? (
                    <Coin className="lv-coin" />
                ) : (
                    <img src={img ? img : ''} alt="Icon of crypto" />
                )}
                <span>{newName + '...'}</span>
                <span>{price.toLocaleString()}$</span>
                <span
                    style={
                        percent > 0
                            ? { color: '#58D7AC' }
                            : { color: '#DD577D' }
                    }
                >
                    {percentInt.toFixed(2)}%
                </span>
                <Link to={`/info/crypto/${name}`}>
                    <span>
                        <i className="fas fa-caret-right"></i>
                    </span>
                </Link>
            </CardWrapper>
        </>
    );
};

export default CryptoCard;
