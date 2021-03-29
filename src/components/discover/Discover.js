import React from 'react'; //changed! useState and useEffect removed
//import axios from 'axios' //remove?
// import MockGetMoversEU from '../../api/Mock/MockGetMoversEU.json';
// import MockGetMoversUS from '../../api/Mock/MockGetMoversUS.json';
// import MockWatchList from '../../api/Mock/MockWatchList.json';


import DiscoverTopTab from './discover-top-tabs/DiscoverTopTab'
import SearchBar from '../shared/search-bar/SearchBar';
import { ContentWrapper } from './DiscoverElements';
//import { ContentWrapper as AnotherWrapper } from '../shared/homepage-custom-sections/HomepageComponentsElements'; //remove?
//import { ShowCryptoBtn } from '../shared/button/ButtonElements'; //remove?
// import { useSelector } from 'react-redux';

const Discover = () => {
    // const followingArray = useSelector((state) => state.Following)
    // const StocksArray = useSelector((state) => state.Stocks)

    return (
        <>
            <ContentWrapper>
                <SearchBar />
                <DiscoverTopTab />
            </ContentWrapper>
        </>
    );
};

export default Discover;
