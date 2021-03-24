import React, {useEffect, useContext, useState} from 'react'

import { FirebaseContext } from '../../../../firebase/context';

import { ContentWrapper } from './BoughtStocksElements'

const BoughtStocks = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext)
    const [orgDataListState, setOrgDataListState] = useState([])
    const [orgBoughtData, setOrgBoughtData] = useState([])
    useEffect(() => {
        let orgDataArr = []
        let orgData = firebase.db.ref('organizations/' + user.organization + '/users');
        orgData.on('value', (snapshot) => {
            const boughtStocks = snapshot.val();
            if (!boughtStocks) return;
            for (const key in boughtStocks) {
                orgDataArr.push({ ...boughtStocks[key] });
            }
            setOrgDataListState(orgDataArr)
            makeBoughtArray(orgDataListState)
        });

    }, [])
    //TODO Ska sätta alla köpta stocks i en array
    const makeBoughtArray = (arr) => {
        let array = []
        arr.forEach((item) => {
            if(item.possessionStocks) {
                if(item.possessionStocks.array.amount){
                    const boughtObj = {
                        name: item.possessionStocks.array.name,
                        amount: item.possessionStocks.array.amount
                    }
                    array.push(boughtObj)
                }

            }
        })
        setOrgBoughtData(array)
    }
    console.log(orgBoughtData)
    return (
        <ContentWrapper>
            <h1>Bought Stocks Here</h1>
            {orgDataListState.map((item, index) => {
                return <p key={index}>{item.possessionStocks ? item.possessionStocks.array.name : ''} </p>
            })}
        </ContentWrapper>
    )
}

export default BoughtStocks
