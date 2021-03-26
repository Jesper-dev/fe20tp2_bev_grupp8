import React, {useEffect, useState} from 'react'
import axios from "axios"
import { Line } from 'react-chartjs-2';

import { ContentWrapper, InLineDiv } from './CryptoChartElements'

const CryptoChart = ({ id, img, name}) => {
    const [cryptoInfo, setCryptoInfo] = useState([])
    const [labelsSate, setLabelState] = useState([])
    const [priceSate, setPriceState] = useState([])

    let labels = []
    let prices = []
    useEffect(() => {
        const weekAgo = Date.now() - 604800000
        const today = Date.now().valueOf()

        const unixTime = Math.floor(today / 1000);
        const unixTimeWeek = Math.floor(weekAgo / 1000)

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
                pointHoverBackgroundColor: 'rgba(220,220,220,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
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
                <h1>{name}</h1>
                <img src={img} />
            </InLineDiv>
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
    )
}

export default CryptoChart
