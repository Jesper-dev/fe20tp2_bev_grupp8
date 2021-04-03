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
import SearchBar from '../shared/search-bar/SearchBar';
import DiscoverSearch from './discover-search/DiscoverSearch';
import TabBar from '../shared/tab-bar/TabBar';

import { useSelector } from 'react-redux';

const Discover = () => {
    const Searching = useSelector((state) => state.Searching);

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
            <HeaderWrapper>
                <DiscoverSearch />
                {!Searching ? <TabBar tabs={tabs} /> : null}
            </HeaderWrapper>
            {!Searching ? (
                <MainWrapper>
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
