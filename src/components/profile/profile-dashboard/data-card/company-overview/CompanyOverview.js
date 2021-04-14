import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TotalStockAssets from '../total-stock-assets/TotalStockAssets';
import { CompanyOverviewWrapper } from './CompanyOverviewElements';

const TotalCompValue = () => {
    const [totalOrgCurrency, setTotalOrgCurrency] = useState(0);

    const OrganizationData = useSelector((state) => state.OrganizationData);
    const [change, setChange] = useState(0);
    const [roi, setRoi] = useState(0);
    const [didMount, setDidMount] = useState(false);

    // let totalValue = [];
    //let orgData = [];
    //let totalCurrency = 0; //changed! placed in useEffect

    useEffect(() => {
        setDidMount(true);
        let totalCurrency = 0;

        for (let i = 0; i < OrganizationData.length; i++) {
            let currency = OrganizationData[i].currency.currency;
            totalCurrency += currency;
        }
        //if (recentlyBought[0] === curentstockprice)

        // timeOfbuying = recentlyBought.amount * recentlyBought.price;

        // curentValue = possessionStocks[0].amount * possessionStocks[0].regularMarketPrice;

        let howManyBought = 50; //how many shares were bought
        //let timeOfbuying = 250; //what was the value
        let currentvalue = 550; //what is the current value now  of bought stock

        let currentValueOfInvest = currentvalue * howManyBought; // värdeföränding i aktien
        let costOfInvestment = 0;

        let totalCapital = parseInt(totalCurrency);

        let originalValue = OrganizationData.length * 100000;
        costOfInvestment = totalCapital - originalValue; //hur mycket vi har köpt

        let roi = currentValueOfInvest - costOfInvestment;
        setRoi(roi);
        ///console.log(roi);

        let changePercent = (roi / costOfInvestment) * 100;

        if (changePercent == Infinity) {
            changePercent = 0;
        } else changePercent = (roi / costOfInvestment) * 100;

        // console.log(changePercent);
        setChange(changePercent);
        setTotalOrgCurrency(totalCapital + roi); //should Roi be add to total capital
        return () => {
            setDidMount(false);
        };
    }, [didMount, OrganizationData]);

    // 500000 - 475000 = 25000
    // 475000 - 500000 = -25000
    // ROI = (curent value of inventst =25000 - cost investment =25000  )

    return (
        <CompanyOverviewWrapper>
            <TotalStockAssets />
            {/*      <article>
                <h2>Wallet</h2>
                <h3>{totalOrgCurrency.toLocaleString()}$</h3>
            </article> */}
            <article>
                <h2>Change</h2>
                <h3
                    style={
                        change > 0
                            ? { color: 'var(--lighter-green)' }
                            : { color: 'var(--lighter-red)' }
                    }
                >
                    {/* {!Infinity ? 'Loading' : change.toFixed(2)}% */}
                    {change.toFixed(2)}%
                </h3>
            </article>
            <article>
                <h2 title="Return of investment (ROI)">Return</h2>
                <h3>{roi}$</h3>
            </article>
        </CompanyOverviewWrapper>
    );
};

export default TotalCompValue;
