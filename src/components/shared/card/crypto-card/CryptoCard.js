import React,{ useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import { CardWrapper } from './CryptoCardElements';

import Coin from '../../../svgs/Coin';


const CryptoCard = ({ name, id, price, img, percent, amount, symbol }) => {

    let history = useHistory();
    const [showName, setShowName] = useState(true)

    useEffect(() => {
        if(window.screen.width > 600) {
            setShowName(true)
        } else {
            setShowName(false)
        }
        // window.addEventListener('resize', checkSize);

        // return () => {
        //   window.removeEventListener('resize', checkSize);
        // };
    }, [])

    const setChosenCryptoOption = () => {
        history.push(`/info/crypto/${id}`);
    };

    const newName = () => {
        if(!name) return
        let newName = name.substring(0, 3);
        return newName
    }


    let percentInt = parseFloat(percent);

    const checkSize = () => {
        console.log("Hej")
        if(window.innerWidth > 600){
            setShowName(true)
            console.log("Den är true")
        } else{
            console.log("Den är false")
            setShowName(false)
        }
    }



    return (
        <>
            <CardWrapper onClick={() => setChosenCryptoOption()}>
                {!amount ? (
                    ''
                ) : (
                    <span>
                        {amount.toFixed(2)}{' '}
                        <i
                            className="fas fa-piggy-bank"
                            style={{ color: 'pink' }}
                        ></i>
                    </span>
                )}
                {img === 'LV-CrY' ? (
                    <Coin className="lv-coin" />
                ) : (
                    <img src={img ? img : ''} alt="Icon of crypto" />
                )}
                <span>{!showName ? newName() + '...' : name}</span>
                {/*  <span>{name}</span> */}
                <span>{price ? price.toLocaleString() : 707}$</span>
                <span
                    style={
                        percent > 0
                            ? { color: '#58D7AC' }
                            : { color: '#DD577D' }
                    }
                >
                    {percentInt ? percentInt.toFixed(2) : 0}%
                </span>
                <Link to={`/info/crypto/${id}`}>
                    <span>
                        <i className="fas fa-caret-right"></i>
                    </span>
                </Link>
            </CardWrapper>
        </>
    );
};

export default CryptoCard;
