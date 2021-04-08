import React, { useEffect, useContext, useState } from 'react';

import { FirebaseContext } from '../../../../firebase/context';

import { ContentWrapper, EmployeesValue } from './TotalCompValueElements';

const TotalCompValue = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const [totalOrgCurrency, setTotalOrgCurrency] = useState(0);
    const [orgDataState, setOrgDataState] = useState([]);

    const [change, setChange] = useState(0);
    const [roi, setRoi] = useState(0);
    const [didMount, setDidMount] = useState(false);
    // let totalValue = [];
    //let orgData = [];
    //let totalCurrency = 0; //changed! placed in useEffect

    useEffect(() => {
        setDidMount(true);
        let totalValue = [];
        let orgData = [];
        //totalCurrency = 0;
        let totalCurrency = 0;
        firebase
            .organization(user.organization)
            .child('/users')
            .on('value', (snapshot) => {
                totalValue = snapshot.val();
                if (!totalValue) return;

                for (const key in totalValue) {
                    orgData.push({ ...totalValue[key] });
                }

                console.log(orgData);
                setOrgDataState(orgData);
                makeBoughtArray(orgData);

                for (let i = 0; i < orgData.length; i++) {
                    let currency = orgData[i].currency.currency;
                    totalCurrency += currency;
                }

                let currentInvest = 35000;
                let costInvestment = parseInt(totalCurrency);
                setTotalOrgCurrency(costInvestment);

                let originalValue = orgData.length * 100000;
                let roi = currentInvest - costInvestment; ///ROI = (curent value of inventst =25000 - costInvestment =25000  )
                //let roi = costInvestment - originalValue;
                setRoi(roi);

                let changePercent = roi / costInvestment; //* 100;
                setChange(changePercent);
            });
        return () => {
            setDidMount(false);
        };
    }, [didMount, firebase, user.uid, user.organization]);

    // 500000 - 475000 = 25000
    // 475000 - 500000 = -25000
    // ROI = (curent value of inventst =25000 - costInvestment =25000  )

    return (
        <div className="quick-info-cards">
            <article>
                <h1>Wallet</h1>
                <h2>{totalOrgCurrency.toLocaleString()}$</h2>
            </article>
            <article>
                <h1>Change</h1>
                <h2
                    style={
                        change > 0
                            ? { color: 'var(--lighter-green)' }
                            : { color: 'var(--lighter-red)' }
                    }
                >
                    {change.toFixed(2)}%
                </h2>
            </article>
            <article>
                <h1 title="Return of investment (ROI)">Return</h1>
                <h2>{roi}$</h2>
            </article>
        </div>
    );
};

export default TotalCompValue;
