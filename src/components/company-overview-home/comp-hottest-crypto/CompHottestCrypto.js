import React, { useEffect, useState, useContext } from 'react';

import {
    MakeOneArrayOrganization,
    ReduceArrayDuplicateAndMerge,
    sortArrayOfObjByLargetsNumber,
} from '../../shared/functions/ArrayManipulationFuncs';
import { fetchUsersOrgSnapshotArray } from '../../shared/functions/firebase-functions';

import SectionDataIndicator from '../../shared/card/section-data-indicator/SectionDataIndicator'
import CryptoCardSmall from '../../shared/card/crypto-card-small/CryptoCardSmall';
import { ContentWrapper } from '../comp-hottest-stocks/CompHottestStocksElements';

import { FirebaseContext } from '../../firebase/context';

const CompHottestCrypto = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);

    const [stockData, setStockData] = useState(null);
    const [hottestStocks, setHottestStocks] = useState(null);


    let LabelsArr = [<i className="fab fa-bitcoin"></i>, 'name', '$', '% 24h ▾', <i className="fas fa-info"></i>];

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
    return (
        <>
            <ContentWrapper>
                {!hottestStocks ? null : (
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
                                        name={item.symbol}
                                        price={20}
                                        percent={20}
                                        img={"https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579"}
                            
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
