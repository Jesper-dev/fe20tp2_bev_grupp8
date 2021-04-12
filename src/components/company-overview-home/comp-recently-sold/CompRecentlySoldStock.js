import React,{ useEffect, useContext, useState } from 'react'

import SectionDataIndicator from '../../shared/card/section-data-indicator/SectionDataIndicator'
import StockCardSmall from '../../shared/card/stock-card-small/StockCardSmall';
import { ContentWrapper } from '../comp-hottest-stocks/CompHottestStocksElements';

import {
    fetchUsersOrgSnapshotArray
} from '../../shared/functions/firebase-functions';

import { FirebaseContext } from '../../firebase/context';

const CompRecentlySoldStock = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const [stockData, setStockData] = useState(null);

    let LabelsArr = [<i className="fas fa-globe"></i>, 'name', '$', '% 24h ▾', <i className="fas fa-info"></i>];

    useEffect(() => {
        fetchUsersOrgSnapshotArray(firebase, user.organization, '/recentlySold', setStockData)
    }, [])
    return (
        <>
                    <ContentWrapper>
            {!stockData ? null : (
                <>
                    <div>
                        <h4>
                            Recently bought
                        </h4>
                        <SectionDataIndicator LabelsArr={LabelsArr} />
                        {stockData.map((item, i) => {
                            return (
                                <StockCardSmall
                                    key={i}
                                    i={i}
                                    name={item.symbol}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </ContentWrapper>
        </>
    )
}

export default CompRecentlySoldStock
