import React from 'react'
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { chosenCrypto } from '../../../../redux/actions';

import { CardWrapper } from './CryptoCardElements'

let chosenCryptoArray = [];

const CryptoCard = ({name, price, img, percent, cryptoList}) => {
    const dispatch = useDispatch();

    const setChosenCryptoOption = (name) => {
        let filterName = name.trim();
        chosenCryptoArray = cryptoList.filter(function (item) {
            return item.name === filterName;
        });


        dispatch(chosenCrypto(chosenCryptoArray));
    };

    return (
        <>
            <CardWrapper>
                <img src={img} alt='Icon of crypto' />
                <span>{name}</span>
                <span>{price.toLocaleString()}$</span>
                <span>{percent.toFixed(2)}%</span>
                <Link to="/info-crypto">
                    <span onClick={() => setChosenCryptoOption(name)}>info</span>
                </Link>
            </CardWrapper>
        </>
    )
}

export default CryptoCard
