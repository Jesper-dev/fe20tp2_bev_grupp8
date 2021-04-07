import React, {useEffect, useContext, useState} from 'react'

import { FirebaseContext } from '../../../../firebase/context';

import { ContentWrapper } from './BoughtStocksElements'

const BoughtStocks = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext)
    const [orgDataListState, setOrgDataListState] = useState([])
    const [orgBoughtData, setOrgBoughtData] = useState([])
    let array = []

    useEffect(() => {
        let orgDataArr = []

        let orgData = firebase.organization(user.organization + '/users');
        orgData.on('value', (snapshot) => {
            const boughtStocks = snapshot.val();
            if (!boughtStocks) return;
            for (const key in boughtStocks) {
                orgDataArr.push({ ...boughtStocks[key] });
            }
            setOrgDataListState(orgDataArr)
            console.log(orgDataArr)

            makeBoughtArray(orgDataArr)
        });

    }, [])

    const makeBoughtArray = (arr) => {
        console.log(arr)
        let orgStockPossessionArr = []
            let j = 0;
            let i = 0;
            while (j < arr.length) {
            let keys = Object.keys(arr[j].possessionStocks);
            if (arr[j].possessionStocks[keys[i]] === undefined) {
                i = 0;
                j++;
            } else {
                orgStockPossessionArr.push({ symbol: arr[j].possessionStocks[keys[i]].symbol, amount: arr[j].possessionStocks[keys[i]].amount, username: arr[j].username});
                i++;
            }
        }

          console.log(orgStockPossessionArr)
          let uniq = [...new Set(orgStockPossessionArr)];

          console.log(uniq)



        setOrgBoughtData(orgStockPossessionArr)
    }

    return (
        <ContentWrapper>
            <h1>Bought Stocks Here</h1>
            <p> adsadsa a :d </p>
            {orgBoughtData.map((item, index) => {
                return <p key={index}>{item.symbol ? item.symbol : ''} </p>
            })}
        </ContentWrapper>
    )
}

export default BoughtStocks
