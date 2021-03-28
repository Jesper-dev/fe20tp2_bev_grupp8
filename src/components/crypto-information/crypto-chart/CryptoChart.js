import React, {useEffect, useState, useContext} from 'react'
import axios from "axios"
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { FirebaseContext } from '../../firebase/context';

import {
    ContentWrapper,
    InLineDiv
} from './CryptoChartElements';
import { WatchStockButton } from '../../stock-infomation/StockInfromationElements'

const CryptoChart = ({ id, img, name, onFollow }) => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const [cryptoInfo, setCryptoInfo] = useState([])
    const [labelsSate, setLabelState] = useState([])
    const [priceSate, setPriceState] = useState([])

    const chosenCrypto = useSelector((state) => state.ChosenCrypto);
    const [checked, setChecked] = useState(false)

    const firebase = useContext(FirebaseContext);

/* 
    console.log(checked) */

    const onChange = () => {
        setChecked(!checked);

    }

    let labels = []
    let prices = []
    useEffect(() => {

         let followingDB = firebase.db.ref(
             'users/' + user.uid + '/followingCrypto/array'
         );
         followingDB.on('value', (snapshot) => {
             const data = snapshot.val();
             console.log(data);

             if (!data) return;
             data.forEach((item) => {
                 // if(!item || !item.symbol) return
                 if (item.symbol === chosenCrypto[0].symbol) {
                     setChecked(true);
                 } else if (!item.symbol === chosenCrypto[0].symbol) {
                     setChecked(false);
                 }
             });
         });

        const weekAgo = Date.now() - 604800000
        const today = Date.now().valueOf()

        const unixTime = Math.floor(today / 1000);
        const unixTimeWeek = Math.floor(weekAgo / 1000)
        console.log(checked)
    /*     setCheckedCrypto(checked) */

        getCryptoInfo(unixTimeWeek, unixTime)

        return () => {
            setCryptoInfo([])
        }
    }, [])

    const createArr = async (arr) => {
        if(arr.length == 0) return

        for(let i = 0; i < arr.prices.length; i++){
            labels.push(new Date(arr.prices[i][0]).toDateString().slice(4,10))
            prices.push(arr.prices[i][1])
        }
        setLabelState(labels)
        setPriceState(prices)
    }

    const getCryptoInfo = (unixTimeWeek, unixTime) => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${unixTimeWeek}&to=${unixTime}`)
            .then(res => createArr(res.data))
            .catch(err => console.log(err))
    }


    const chartData = {
        labels: labelsSate, //data for X-axis
        datasets: [
            {
                fill: true,
                lineTension: 0,
                backgroundColor: 'rgba(88, 215, 172, 0.5)',
                borderColor: '#58D7AC',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#58D7AC',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'white',
                pointHoverBorderColor: '#58D7AC',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: priceSate,
            },
        ],
    };
    return (
        <ContentWrapper>
            <InLineDiv>
                <img src={img} />
                <h1>{name}</h1>
            </InLineDiv>
            <div className="chart-topbar-wrapper">
                <WatchStockButton
                    eyecolor={
                        checked ? 'var(--secondary)' : 'var(--body-fourth)'
                    }
                    onClick={() => {
                        onFollow();
                        onChange();
                    }}
                    /*      onChange={} */
                >
                    <i className="far fa-eye"></i>
                </WatchStockButton>
            </div>
            <Line
                data={chartData}
                options={{
                    legend: {
                        display: false,
                    },
                }}
            />
            <div></div>
        </ContentWrapper>
    );
}

export default CryptoChart
