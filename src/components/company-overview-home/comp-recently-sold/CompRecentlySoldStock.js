import React,{ useEffect, useContext, useState } from 'react'
import { useSelector } from 'react-redux'

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

    const FetchedStockList = useSelector(state => state.FetchedStockList)

    let LabelsArr = [<i className="fas fa-globe"></i>, 'name', '$', '% 24h ▾', <i className="fas fa-info"></i>];

    useEffect(() => {
        fetchUsersOrgSnapshotArray(firebase, user.organization, '/recentlySold', setStockData)
    }, [])

    const findIndex = (item) => {
        console.log(item.symbol)
   /*      return */
        let index = FetchedStockList[FetchedStockList.findIndex(x => x.symbol == item.symbol)]
        console.log(index)
        return index
    }
    return (
        <>
                    <ContentWrapper>
            {!stockData || !FetchedStockList.length > 0 ? null : (
                <>
                    <div>
                        <h4>
                            Recently sold
                        </h4>
                        <SectionDataIndicator LabelsArr={LabelsArr} />
                        {stockData.map((item, i) => {
                            return (
                                <StockCardSmall
                                    key={i}
                                    i={i}
                                    name={findIndex(item).symbol}
                        shortname={findIndex(item).shortName}
                        cost={findIndex(item).regularMarketPrice}
                        percent={findIndex(item).regularMarketChangePercent}
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
