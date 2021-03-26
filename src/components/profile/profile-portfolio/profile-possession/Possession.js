import React, {useEffect, useContext, useState } from 'react'
import {useSelector} from "react-redux"
import StockCard from '../../../shared/card/stock-card/StockCard'
import MockGetTickers from '../../../../api/Mock/MockGetTickers.json';
import { ContentWrapper } from '../ProfilePortfolioElements';
import { FirebaseContext } from '../../../firebase/context';


const Possession = () => {
    // const Stocks = useSelector((state) => state.Stocks)
    let array = MockGetTickers.finance.result[0].quotes;
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const [stocksPossesionState, setStocksPossesionState] = useState([])


    useEffect(() => {

        let userPossesionFirebase = firebase.db.ref('users/' + user.uid);
        userPossesionFirebase.on('value', (snapshot) => {
            const possessionData = snapshot.val();
            if (!possessionData) return;
            // for (const key in possessionData) {
            //     orgDataArr.push({ ...possessionData[key] });
            // }
         setStocksPossesionState(possessionData.possessionStocks.array)

        });
    }, [])

    return (
        <ContentWrapper>
            <h3>Possession</h3>
            {stocksPossesionState.map((item, index) => {
                return  (
                <StockCard
                    key={index}
                    amount={item.amount}
                    name={item.symbol ? item.symbol : item.shortName}
                    percent={
                        item.regMarketChangePercent
                    }
                    cost={
                        item.price * item.amount
                    }
                    stocksList={stocksPossesionState}/>
                )})}
        </ContentWrapper>
    )
}

export default Possession