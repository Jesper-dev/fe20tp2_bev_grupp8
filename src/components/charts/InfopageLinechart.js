import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import MockChartsAMZN from '../../api/Mock/MockChartsAMZN.json';
import MockChartsFB from '../../api/Mock/MockChartsFB.json';

const InfopageLinechart = () => {
    const [data, setData] = useState();
    const [timestamps, setTimestamps] = useState([]);

    let stockValue =
        MockChartsFB.chart.result[0].indicators.adjclose[0].adjclose;

    /* let stockValueWeek = stockValue.splice((stockValue.length - 7), stockValue.length) */

    let stockValueWeek = [];
    const pastWeekValue = () => {
        for (let i = 0; i < 7; i++) {
            stockValueWeek.unshift(stockValue[stockValue.length - (i + 1)]);
        }
    };

    pastWeekValue();

    let newArr = [];
    let timeArr = MockChartsFB.chart.result[0].timestamp;

    const pastWeekDates = () => {
        let date = new Date().toString().slice(4, 10);
        for (let i = 0; i < 6; i++) {
            let d = new Date(
                timeArr[timeArr.length - (i + 1)] * 1000
            ).toDateString();

            newArr.unshift(d.slice(4, 10));
        }
        newArr.push(date);
    };
    pastWeekDates();

    const chartData = {
        labels: newArr, //data for X-axis
        datasets: [
            {
                fill: false,
                lineTension: 0,
                backgroundColor: 'black',
                borderColor: 'red',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'red',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(220,220,220,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: stockValueWeek,
            },
        ],
    };

    return (
        <>
            <Line
                data={chartData}
                options={{
                    /* maintainAspectRatio: false, */
                    legend: {
                        display: false,
                    },
                }}
            />
        </>
    );
};

export default InfopageLinechart;
