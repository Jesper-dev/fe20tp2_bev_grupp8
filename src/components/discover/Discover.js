import React from 'react'; //changed! useState and useEffect removed
import { Route } from 'react-router';
import * as ROUTES from '../../constants/routes';
import DiscoverStocksList from './discover-stocklist/DiscoverStocksList';
import DiscoverCryptoList from './discover-cryptolist/DiscoverCryptoList';

//import axios from 'axios' //remove?
// import MockGetMoversEU from '../../api/Mock/MockGetMoversEU.json';
// import MockGetMoversUS from '../../api/Mock/MockGetMoversUS.json';
// import MockWatchList from '../../api/Mock/MockWatchList.json';

import SearchBar from '../shared/search-bar/SearchBar';
import DiscoverTopTab from './discover-top-tabs/DiscoverTopTab';
import { ContentWrapper, HeaderWrapper, MainWrapper } from './DiscoverElements';
//import { ContentWrapper as AnotherWrapper } from '../shared/homepage-custom-sections/HomepageComponentsElements'; //remove?
//import { ShowCryptoBtn } from '../shared/button/ButtonElements'; //remove?
// import { useSelector } from 'react-redux';

const Discover = () => {
    const tabs = [
		{
			label: 'Discover',
			icon: <i className="fas fa-search-dollar"></i>,
			link: ROUTES.DISCOVER
		},
		{
			label: "Stocks",
			icon: <i className="fas fa-chart-line"></i>,
			link: ROUTES.DISCOVER_STOCKS
		},
		{
			label: "Crypto",
			icon: <i className="fab fa-btc"></i>,
			link: ROUTES.DISCOVER_CRYPTO
		}
	];
    return (
        <ContentWrapper>
            <HeaderWrapper>
                <SearchBar />
                <DiscoverTopTab />
            </HeaderWrapper>
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
        </ContentWrapper>
    );
};

export default Discover;

// {/* <Route exact path={ROUTES.DISCOVER_STOCKS}>
// <Discover />
// {/*  <DiscoverStocksList /> */}
// <NavbarLeft />
// <Toolbar />
// </Route> */}
