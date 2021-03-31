import React, { useEffect, useContext, useState } from 'react';
//import {useSelector} from "react-redux"
import StockCard from '../../../shared/card/stock-card/StockCard';
//import MockGetTickers from '../../../../api/Mock/MockGetTickers.json';
import { ContentWrapper } from './PossessionElements';
import { FirebaseContext } from '../../../firebase/context';

const Possession = () => {
    // const Stocks = useSelector((state) => state.Stocks)
    //let array = MockGetTickers.finance.result[0].quotes; //remove?
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const [stocksPossesionState, setStocksPossesionState] = useState([]);

    useEffect(() => {
        let possessioList = [];
        firebase
            .user(user.uid)
            .child('/possessionStocks')
            .on('value', (snapshot) => {
                const possessionData = snapshot.val();
                if (!possessionData) return;
                for (const key in possessionData) {
                    possessioList.push({ ...possessionData[key] });
                }
                setStocksPossesionState(possessioList);
            });
    }, [firebase, user.uid]); //changed!

    return (
        <ContentWrapper>
            <h1>Possession</h1>
            {stocksPossesionState.length > 0 ? stocksPossesionState.map((item, index) => {
                return (
                    <StockCard
                        key={index}
                        amount={item.amount}
                        name={item.symbol ? item.symbol : item.shortName}
                        percent={item.percent}
                        cost={item.price * item.amount}
                        stocksList={stocksPossesionState}
                    />
                );
            }) : <p>Loading...</p>}
        </ContentWrapper>
    );
};

export default Possession;
