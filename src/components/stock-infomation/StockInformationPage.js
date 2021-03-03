import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom"

import {ContentWrapper} from "./StockInfromationElements"

const StockInformationPage = () => {
    const chosenShare = useSelector((state) => state.ChosenShare);

    return (
        <ContentWrapper>
            {chosenShare.map((item, index) => {
                return <div key={index}>
                    <h1>{item.shortName}</h1>
                    <p>{item.symbol}</p>
                    <p>Pre market price: {item.preMarketPrice} $</p>
                    <p>Market price: {item.regularMarketPrice} $</p>
                    <p>Market change: {item.regularMarketChange.toFixed(2)}%</p>
                    <p>Market change percent: {item.regularMarketChangePercent.toFixed(2)}%</p>
                </div>
            })}
            <Link to="/">Back</Link>
        </ContentWrapper>
    )
}

export default StockInformationPage
