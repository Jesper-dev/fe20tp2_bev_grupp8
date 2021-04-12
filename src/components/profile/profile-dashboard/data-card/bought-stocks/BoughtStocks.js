import React, { useEffect, useContext, useState } from 'react';

import StockCard from '../../../../shared/card/stock-card/StockCard';

import {
    sortArrayOfObjByLargetsNumber,
    ReduceArrayDuplicateAndMerge,
} from '../../../../shared/functions/ArrayManipulationFuncs';

import { FirebaseContext } from '../../../../firebase/context';
import { ContentWrapper } from './BoughtStocksElements';

const BoughtStocks = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const [orgBoughtData, setOrgBoughtData] = useState([]);

    let orgStockPossessionArr = [];

    useEffect(() => {
        let orgDataArr = [];

        let orgData = firebase.organization(user.organization + '/users');
        orgData.on('value', (snapshot) => {
            const boughtStocks = snapshot.val();
            if (!boughtStocks) return;
            for (const key in boughtStocks) {
                orgDataArr.push({ ...boughtStocks[key] });
            }

            makeBoughtArray(orgDataArr);
        });
    }, []);

    /*     const ReduceArrayDuplicateAndMerge = (arr, dupkey, mergekey) => {
        let result = [];
        arr.forEach((a) => {
            if (!this[a[dupkey]]) {
                this[a[dupkey]] = {
                    [dupkey]: a[dupkey],
                    [mergekey]: 0,
                };
                result.push(this[a[dupkey]]);
            }
            this[a[dupkey]][mergekey] += a[mergekey];
        }, Object.create(null));
        return result;
    };
 */
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
            let keys = Object.keys(arr[j].possessionStocks);
            if (arr[j].possessionStocks[keys[i]] === undefined) {
                i = 0;
                j++;
            } else {
                orgStockPossessionArr.push({
                    symbol: arr[j].possessionStocks[keys[i]].symbol,
                    amount: arr[j].possessionStocks[keys[i]].amount,
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

            sortArrayOfObjByLargetsNumber(reducedArray);

            reducedArray.reverse().splice(5, reducedArray.length);

            setOrgBoughtData(reducedArray);
        }
    };

    return (
        <ContentWrapper>
            <h1>Top 5 owned stocks</h1>
            {orgBoughtData.map((item, index) => {
                return (
                    <StockCard
                        key={index}
                        name={item.symbol}
                        amount={item.amount}
                    />
                );
            })}
        </ContentWrapper>
    );
};

export default BoughtStocks;
