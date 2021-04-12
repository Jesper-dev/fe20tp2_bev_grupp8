import React, { useEffect, useState, useContext } from 'react';

import {
    MakeOneArrayOrganization,
    ReduceArrayDuplicateAndMerge,
    sortArrayOfObjByLargetsNumber,
} from '../../shared/functions/ArrayManipulationFuncs';
import { fetchUsersOrgSnapshotArray } from '../../shared/functions/firebase-functions';

import StockCardSmall from '../../shared/card/stock-card-small/StockCardSmall';
import { ContentWrapper } from './CompHottestStocksElements';

import { FirebaseContext } from '../../firebase/context';

const CompHottestStocks = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);

    const [stockData, setStockData] = useState(null);
    const [hottestStocks, setHottestStocks] = useState(null);

    useEffect(() => {
        fetchUsersOrgSnapshotArray(
            firebase,
            user.organization,
            '/users',
            setStockData
        );
    }, []);

    useEffect(() => {
        console.log(stockData);

        let boughtStocksArr = MakeOneArrayOrganization(stockData);

        if (!boughtStocksArr) return;
        let reducedArray = ReduceArrayDuplicateAndMerge(boughtStocksArr);
        sortArrayOfObjByLargetsNumber(reducedArray);

        reducedArray.reverse().splice(3, reducedArray.length);

        setHottestStocks(reducedArray);
        console.log(reducedArray);
    }, [stockData]);

    return (
        <>
            {!hottestStocks ? null : (
                <ContentWrapper>
                    <h4>Comp. hottest</h4>

                    {hottestStocks.map((item, i) => {
                        return <StockCardSmall key={i} name={item.symbol} />;
                    })}
                </ContentWrapper>
            )}
        </>
    );
};

export default CompHottestStocks;
