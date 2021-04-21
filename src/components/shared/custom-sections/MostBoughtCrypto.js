import React, { useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import CryptoCard from '../card/crypto-card/CryptoCard';
import { SectionWrapper } from './CustomComponentsElements';

import SectionDataIndicator from '../card/section-data-indicator/SectionDataIndicator';

const MostBoughtCrypto = () => {
    const Users = useSelector((state) => state.Users);
    const FetchedCryptoList = useSelector(state => state.FetchedCryptoList)

    const [orgDataListState, setOrgDataListState] = useState([]);
    const [orgBoughtData, setOrgBoughtData] = useState([]);

    let LabelsArr = ['icon', 'name', 'price', 'change 24h ▾', 'info'];

    useEffect(() => {
        makeBoughtArray(Users);
    }, [Users]);

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
        if (!arr) return;
        let orgStockPossessionArr = [];
        let j = 0;
        let i = 0;
        while (j < arr.length) {
            let keys = Object.keys(arr[j].possessionCrypto);
            if (arr[j].possessionCrypto[keys[i]] === undefined) {
                i = 0;
                j++;
            } else {
                if (arr[j].possessionCrypto[keys[i]].name == 'lets-vest-CrY') {
                    i++;
                    continue;
                }

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
        }
    };
/*     let index = FetchedCryptoList[FetchedCryptoList.findIndex(x => x.symbol == item.symbol)]; */
const findIndex = (item) => {
    let index = FetchedCryptoList[FetchedCryptoList.findIndex(x => x.symbol == item.symbol)]
    return index
}

    return (
        <SectionWrapper>
            <h3>
                Hottest cryptos{' '}
                <i className="fas fa-fire-alt" style={{ color: 'orange' }}></i>
            </h3>
            <SectionDataIndicator LabelsArr={LabelsArr} />
            {!FetchedCryptoList.length > 0 || !orgBoughtData.length > 0 ? null : (
<>
                {orgBoughtData.map((item, index) => {
                    return (
                        <CryptoCard
                        key={index}
                        name={findIndex(item).name}
                        symbol={findIndex(item).symbol}
                        id={findIndex(item).id}
                        price={findIndex(item).current_price}
                        percent={findIndex(item).price_change_percentage_24h}
                        img={findIndex(item).image}
                        />
                        );
                    })}
                    </>
                    ) }
        </SectionWrapper>
    );
};

export default MostBoughtCrypto;
