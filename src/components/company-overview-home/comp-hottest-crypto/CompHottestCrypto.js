import React, { useEffect, useState, useContext } from 'react';

import {
    MakeOneArrayOrganization,
    ReduceArrayDuplicateAndMerge,
    sortArrayOfObjByLargetsNumber,
} from '../../shared/functions/ArrayManipulationFuncs';
import { fetchUsersOrgSnapshotArray } from '../../shared/functions/firebase-functions';

import SectionDataIndicator from '../../shared/card/section-data-indicator/SectionDataIndicator';
import CryptoCardSmall from '../../shared/card/crypto-card-small/CryptoCardSmall';
import { ContentWrapper } from '../comp-hottest-stocks/CompHottestStocksElements';

import { FirebaseContext } from '../../firebase/context';

import { useSelector } from 'react-redux';

const CompHottestCrypto = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);

    const FetchedCryptoList = useSelector((state) => state.FetchedCryptoList);

    const [stockData, setStockData] = useState(null);
    const [hottestStocks, setHottestStocks] = useState(null);

    let LabelsArr = [
        <i className="fab fa-bitcoin"></i>,
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
            'possessionCrypto'
        );

        if (!boughtStocksArr) return;
        let reducedArray = ReduceArrayDuplicateAndMerge(boughtStocksArr);
        sortArrayOfObjByLargetsNumber(reducedArray);

        reducedArray.reverse().splice(3, reducedArray.length);

        setHottestStocks(reducedArray);
    }, [stockData]);

    const findIndex = (item) => {
        let index =
            FetchedCryptoList[
                FetchedCryptoList.findIndex((x) => x.symbol == item.symbol)
            ];
        return index;
    };
    return (
        <>
            <ContentWrapper>
                {!hottestStocks || !FetchedCryptoList.length > 0 ? null : (
                    <>
                        <div>
                            <h4>
                                Comp. hottest crypto{' '}
                                <i
                                    className="fas fa-fire-alt"
                                    style={{ color: 'orange' }}
                                ></i>
                            </h4>
                            <SectionDataIndicator LabelsArr={LabelsArr} />
                            {hottestStocks.map((item, i) => {
                                return (
                                    <CryptoCardSmall
                                        key={i}
                                        i={i}
                                        name={findIndex(item)?.name ?? 'LV'}
                                        symbol={findIndex(item)?.symbol ?? 'LV'}
                                        price={
                                            findIndex(item)?.current_price ?? 99
                                        }
                                        percent={
                                            findIndex(item)
                                                ?.price_change_percentage_24h ??
                                            99
                                        }
                                        img={findIndex(item)?.image ?? 'IMG'}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </ContentWrapper>
        </>
    );
};

export default CompHottestCrypto;
