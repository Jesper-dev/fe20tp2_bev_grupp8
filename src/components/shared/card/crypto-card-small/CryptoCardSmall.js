import React,{ useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import { CardWrapper } from './CryptoCardElements';

import Coin from '../../../svgs/Coin';

const CryptoCardSmall = ({ name, price, img, percent, amount, i }) => {
    let history = useHistory();
    const [showName, setShowName] = useState(true)

    const setChosenCryptoOption = (name) => {
        history.push(`/info/crypto/${name}`);
    };

    const checkSize = () => {
        if(window.innerWidth > 600){
            setShowName(true)
            
        } else{

            setShowName(false)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', checkSize);

        return () => {
          window.removeEventListener('resize', checkSize);
        };
    }, [])

    let newName = name.substring(0, 3);
    let percentInt = parseFloat(percent);
    return (
        <CardWrapper i={i} onClick={() => setChosenCryptoOption(name)}>
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
                <img src={img ? img : ''} alt="Icon" />
            )}
               <span>{!showName ? newName + '...' : name}</span>
            {/*  <span>{name}</span> */}
            <span>{price.toLocaleString()}</span>
            <span
                style={
                    percent > 0 ? { color: '#58D7AC' } : { color: '#DD577D' }
                }
            >
                {percentInt ? percentInt.toFixed(2) : 0}
            </span>
            <Link to={`/info/crypto/${name}`}>
                <span>
                    <i className="fas fa-caret-right"></i>
                </span>
            </Link>
        </CardWrapper>
    );
};

export default CryptoCardSmall;
