// import axios from 'axios'
// import MockGetMoversEU from '../../api/Mock/MockGetMoversEU.json';
// import MockGetMoversUS from '../../api/Mock/MockGetMoversUS.json';
// import MockWatchList from '../../api/Mock/MockWatchList.json';
// import { useSelector } from 'react-redux';

import React from 'react';
import { Route } from 'react-router';

import * as ROUTES from '../../constants/routes';

import DiscoverStocksList from './discover-stocklist/DiscoverStocksList';
import DiscoverCryptoList from './discover-cryptolist/DiscoverCryptoList';

import { HeaderWrapper, MainWrapper } from './DiscoverElements';

import ContentWrapper from '../shared/wrappers/ContentWrapper';
// import SearchBar from '../shared/search-bar/SearchBar';
import DiscoverSearch from './discover-search/DiscoverSearch';
import TabBar from '../shared/tab-bar/TabBar';
import MostBougthStocks from '../shared/custom-sections/MostBoughtStocks';
import MostBougthCrypto from '../shared/custom-sections/MostBoughtCrypto';

import FetchedAllCrypto from '../../api/user-api-components/FetchAllCrypto'
import FetchedAllStocks from '../../api/user-api-components/FetchAllStocks'

import { useSelector } from 'react-redux';

const Discover = () => {
    const Searching = useSelector((state) => state.Searching);
    const FetchedCryptoList = useSelector(state => state.FetchedCryptoList)
    const FetchedStockList = useSelector(state => state.FetchedStockList)


    const tabs = [
        {
            label: 'Discover',
            icon: <i className="fas fa-search-dollar"></i>,
            link: ROUTES.DISCOVER,
        },
        {
            label: 'Stocks',
            icon: <i className="fas fa-chart-line"></i>,
            link: ROUTES.DISCOVER_STOCKS,
        },
        {
            label: 'Crypto',
            icon: <i className="fab fa-btc"></i>,
            link: ROUTES.DISCOVER_CRYPTO,
        },
    ];

    return (
        
        <ContentWrapper>
                      {FetchedCryptoList == 0 ? (
                <FetchedAllCrypto />
            ) : null}
            {FetchedStockList == 0 ? (
                <FetchedAllStocks />
            ) : null}
        
            <HeaderWrapper>
                <DiscoverSearch />
                {!Searching ? <TabBar tabs={tabs} /> : null}
            </HeaderWrapper>
            {!Searching ? (
                <MainWrapper>
                    <Route
                        exact
                        path={ROUTES.DISCOVER}
                        component={DiscoverStocksList}
                    >
                        <MostBougthStocks />
                        <MostBougthCrypto />
                    </Route>
                    <Route
                        exact
                        path={ROUTES.DISCOVER_STOCKS}
                        component={DiscoverStocksList}
                    />
                    <Route
                        exact
                        path={ROUTES.DISCOVER_CRYPTO}
                        component={DiscoverCryptoList}
                    />
                </MainWrapper>
            ) : null}
        </ContentWrapper>
    );
};

export default Discover;
