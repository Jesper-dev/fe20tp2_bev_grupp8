import React, { useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux'

import CryptoCard from '../card/crypto-card/CryptoCard';
import { ContentWrapper } from './CustomComponentsElements';

const MostBoughtCrypto = () => {
    const Users = useSelector(state => state.Users)

    const [orgDataListState, setOrgDataListState] = useState([]);
    const [orgBoughtData, setOrgBoughtData] = useState([]);


    useEffect(() => {

        makeBoughtArray(Users)

    }, [Users])


    const ReduceFunc = (arr) => {
        let result = [];
        arr.forEach(function (a) {
            if (!this[a.symbol]) {
                this[a.symbol] = { symbol: a.symbol, amount: 0 };
                result.push(this[a.symbol]);
            }
            this[a.symbol].amount += a.amount;
        }, Object.create(null));
        return result;
    };

    const makeBoughtArray = (arr) => {
        let orgStockPossessionArr = [];
        let j = 0;
        let i = 0;
        while (j < arr.length) {
            let keys = Object.keys(arr[j].possessionCrypto);
            if (arr[j].possessionCrypto[keys[i]] === undefined) {
                i = 0;
                j++;
            } else {
                if(arr[j].possessionCrypto[keys[i]].name == "lets-vest-CrY") {
                    i++
                } 
                 /*    console.log(arr[j].possessionCrypto[keys[i]].name) */
                    orgStockPossessionArr.push({
                        symbol: arr[j].possessionCrypto[keys[i]].symbol,
                        amount: arr[j].possessionCrypto[keys[i]].amount,
                        username: arr[j].username,
                    });
                    i++;
              
            }
            const sortByAmount = (arr) => {
                arr.sort(function (a, b) {
                    return a.amount - b.amount;
                });
            };
            let reducedArray = ReduceFunc(orgStockPossessionArr);

            sortByAmount(reducedArray);

            reducedArray.reverse().splice(3, reducedArray.length);

            setOrgBoughtData(reducedArray);

/*             console.log(reducedArray) */
        }
    };

    return (
          <ContentWrapper>
            <h3>Hottest cryptos <i className="fas fa-fire-alt" style={{ color: 'orange'}}></i></h3>
            {orgBoughtData.map((item, index) => {
                return (
                    <CryptoCard
                        key={index}
                        name={'bllbbl'}
                        price={999}
                        percent={9999}
                        img={"https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579"}
                        amount={item.amount}
                    />
                );
            })}
        </ContentWrapper>
    )
}

export default MostBoughtCrypto
