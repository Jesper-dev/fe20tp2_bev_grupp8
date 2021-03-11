import React, {useEffect} from 'react'
import {useSelector} from "react-redux"
import StockCard from '../../shared/card/stock-card/StockCard'
import MockGetTickers from '../../../api/Mock/MockGetTickers.json';
import { ContentWrapper } from './ProfilePortfolioElements';


let newArray = [];
const Possession = () => {
    const Stocks = useSelector((state) => state.Stocks)
    let array = MockGetTickers.finance.result[0].quotes;

    //*Kanske skapa en ny array som inte pushar in om det är två eller fler likadana utan plussar ihop pengar och sånt
    useEffect(() => {
        // for(let i = 0; i < Stocks.length; i++){
        //     if(Stocks[i].name == Stocks[i + 1].name) {
        //         console.log("lol")
        //     } else {
        //         newArray.push(Stocks[i])
        //     }

        // }
        console.log(Stocks)
    }, [])


    //*Displaya den arrayen här istället

    return (
        <ContentWrapper>
            <h3>Possession</h3>
            {newArray.map((item, index) => {
                return  (
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
                    stocksList={array}/>
                )})}
        </ContentWrapper>
    )
}

export default Possession
