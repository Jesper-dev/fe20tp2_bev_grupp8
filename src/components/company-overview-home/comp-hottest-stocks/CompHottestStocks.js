import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';

import {
    MakeOneArrayOrganization,
    ReduceArrayDuplicateAndMerge,
    sortArrayOfObjByLargetsNumber,
} from '../../shared/functions/ArrayManipulationFuncs';
import { fetchUsersOrgSnapshotArray } from '../../shared/functions/firebase-functions';

import SectionDataIndicator from '../../shared/card/section-data-indicator/SectionDataIndicator';
import StockCardSmall from '../../shared/card/stock-card-small/StockCardSmall';
import { ContentWrapper } from './CompHottestStocksElements';

import { FirebaseContext } from '../../firebase/context';

const CompHottestStocks = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);

    const [stockData, setStockData] = useState(null);
    const [hottestStocks, setHottestStocks] = useState(null);
    const FetchedStockList = useSelector((state) => state.FetchedStockList);

    let LabelsArr = [
        <i className="fas fa-globe"></i>,
        'name',
        '$',
        '% 24h ▾',
        <i className="fas fa-info"></i>,
    ];

    useEffect(() => {
        fetchUsersOrgSnapshotArray(
            firebase,
            user.organization,
            '/users',
            setStockData
        );
    }, []);

    useEffect(() => {
        let boughtStocksArr = MakeOneArrayOrganization(
            stockData,
            'possessionStocks'
        );

        if (!boughtStocksArr) return;
        let reducedArray = ReduceArrayDuplicateAndMerge(boughtStocksArr);
        sortArrayOfObjByLargetsNumber(reducedArray);

        reducedArray.reverse().splice(3, reducedArray.length);

        setHottestStocks(reducedArray);
    }, [stockData]);

    const findIndex = (item) => {
        let index =
            FetchedStockList[
                FetchedStockList.findIndex((x) => x.symbol == item.symbol)
            ];
        return index;
    };
    return (
        <ContentWrapper>
            {!hottestStocks ||
            !stockData ||
            !FetchedStockList.length > 0 ? null : (
                <>
                    <div>
                        <h4>
                            Comp. hottest stocks{' '}
                            <i
                                className="fas fa-fire-alt"
                                style={{ color: 'orange' }}
                            ></i>
                        </h4>
                        <SectionDataIndicator LabelsArr={LabelsArr} />
                        {hottestStocks.map((item, i) => {
                            return (
                                <StockCardSmall
                                    key={i}
                                    i={i}
                                    name={findIndex(item)?.symbol ?? 'LV'}
                                    shortname={findIndex(item)?.shortName ?? 'LV'}
                                    cost={findIndex(item)?.regularMarketPrice ?? 250}
                                    percent={
                                        findIndex(item)?.regularMarketChangePercent ?? 2.32
                                    }
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </ContentWrapper>
    );
};

export default CompHottestStocks;
