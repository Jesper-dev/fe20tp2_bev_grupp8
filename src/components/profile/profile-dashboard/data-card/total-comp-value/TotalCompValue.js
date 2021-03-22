import React, {useEffect, useContext, useState} from 'react'

import { FirebaseContext } from '../../../../firebase/context';

import { ContentWrapper, EmployeesValue } from './TotalCompValueElements'

const TotalCompValue = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext)
    const [totalOrgCurrency, setTotalOrgCurrency] = useState(0)
    const [orgDataState, setOrgDataState] = useState([])

    let totalValue = []
    let orgData = []
    let totalCurrency = 0;

    useEffect(() => {
        totalCurrency = 0;
        const orgValueFirebase = firebase.db.ref('organizations/' + user.organization + '/users');
        orgValueFirebase.on('value', (snapshot) => {
            totalValue = snapshot.val();
            if (!totalValue) return;

            for (const key in totalValue) {
                orgData.push({ ...totalValue[key] });
            }
        setOrgDataState(orgData)

            for(let i = 0; i < orgData.length; i++){
                let currency = orgData[i].currency.currency;
                totalCurrency += currency;
            }

            let newInt = parseInt(totalCurrency)
            setTotalOrgCurrency(newInt)

        });
    }, [])


    return (
        <ContentWrapper>
             <header>
                 <div className="total-wrapper">
                    <h1>
                        Comp. Wallet{' '}
                        <span
                            className="percent"
                            style={
                                10 > 0
                                    ? { color: '#58D7AC' }
                                    : { color: '#DD577D' }
                            }
                        >
                            50%
                        </span>
                    </h1>
                    <p className="total">
                        Total: <span>{totalOrgCurrency.toLocaleString()}$</span>
                    </p>
                </div>

                    {orgDataState.map((item, i) => {
                        return (
                        <EmployeesValue>
                            <p>{item.username}</p>
                            <span style={
                                -1 > 0
                                    ? { color: '#58D7AC' }
                                    : { color: '#DD577D' }
                            }>{item.currency.currency}$</span>
                        </EmployeesValue>
                        )
                    })}

                </header>
        </ContentWrapper>
    )
}

export default TotalCompValue
