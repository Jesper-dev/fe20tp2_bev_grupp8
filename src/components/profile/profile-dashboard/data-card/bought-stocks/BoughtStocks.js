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

        let orgData = firebase.db.ref('organizations/' + user.organization + '/users');
        orgData.on('value', (snapshot) => {
            const boughtStocks = snapshot.val();
            if (!boughtStocks) return;
            for (const key in boughtStocks) {
                orgDataArr.push({ ...boughtStocks[key] });
            }
            setOrgDataListState(orgDataArr)

            // makeBoughtArray(orgDataArr)
        });

    }, [])
    //TODO Ska sätta alla köpta stocks i en array
    // const makeBoughtArray = (arr) => {
    //     console.log(arr)

    //     let i = 0;
    //     for(let j = 0; j < arr.length; i++){

    //         if(arr[i].possessionStocks) {
    //             const boughtObj = {
    //                 name: arr[j].possessionStocks.array[i].name,
    //                 amount: arr[j].possessionStocks.array[i].amount
    //             }
    //             array.push(boughtObj)
    //             i++
    //         }
    //         if(arr[i].possessionStocks && arr[j].possessionStocks.array === undefined){
    //             i = 0;
    //             j++
    //         }
    //     }


    //     setOrgBoughtData(array)
    // }
    // console.log(orgBoughtData)
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
