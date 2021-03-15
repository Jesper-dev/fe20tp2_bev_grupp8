import React, {useState} from 'react';
// import MockGetMoversEU from '../../api/Mock/MockGetMoversEU.json';
// import MockGetMoversUS from '../../api/Mock/MockGetMoversUS.json';
// import MockWatchList from '../../api/Mock/MockWatchList.json';
import MockGetTickers from '../../api/Mock/MockGetTickers.json';
import StockCard from '../shared/card/stock-card/StockCard';
import CryptoCard from '../shared/card/crypto-card/CryptoCard'
import MockCrypto from "../../api/Mock/MockCrypto.json"

import SearchBar from '../shared/search-bar/SearchBar'
import { ContentWrapper } from './DiscoverElements';
import {ShowCryptoBtn} from "../shared/button/ButtonElements"

const Discover = () => {
    const [show, setShow] = useState(false)
    let array = MockGetTickers.finance.result[0].quotes;

    return (
        <>
        <SearchBar />
            <ContentWrapper>
                <div>
                    <h2>Stonks Region: {array[0].region} </h2>
                </div>
                {array.map((item, index) => {
                    return (
                        <StockCard
                            key={index}
                            name={item.symbol ? item.symbol : item.shortName}
                            percent={
                                item.regularMarketChangePercent
                                    ? item.regularMarketChangePercent
                                    : 0
                            }
                            cost={
                                item.regularMarketPrice
                                    ? item.regularMarketPrice
                                    : 0
                            }
                            stocksList={array}
                        />
                    );
                })}
                <h2>Crypto</h2>
                <ShowCryptoBtn onClick={() => setShow(!show)}>{show ? 'Hide Crypto' : 'Show Crypto'}</ShowCryptoBtn>
                {MockCrypto.map((item, index) => {
                    return <div style={show ? {display: "block"} : {display: "none"}} key={index}><CryptoCard  name={item.name} price={item.current_price} img={item.image} percent={item.ath_change_percentage} cryptoList={MockCrypto}/></div>
                })}

            </ContentWrapper>
        </>
    );
};

export default Discover;
