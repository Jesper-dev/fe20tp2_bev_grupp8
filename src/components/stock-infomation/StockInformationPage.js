import React from 'react'
import LineChart from '../charts/InfopageLinechart'
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom"

import {ContentWrapper} from "./StockInfromationElements"

const StockInformationPage = () => {
    const chosenShare = useSelector((state) => state.ChosenShare);
    console.log(chosenShare)
    return (
        <ContentWrapper>

            {chosenShare.map((item, index) => {
                return <div key={index}>
                    <h1>{item.shortName}</h1>
                    <LineChart />
                    <p>{item.symbol}</p>
                    <p>Market price: {item.regularMarketPrice} $</p>
                    <p>Reg market change: {item.regularMarketChange.toFixed(2)}%</p>
                    <p>Market change percent: {item.regularMarketChangePercent.toFixed(2)}%</p>
                </div>
            })}
        </ContentWrapper>
    )
}

export default StockInformationPage
