import React, {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2'

import MockCharts from "../../api/MockCharts.json"


const InfopageLinechart = () => {
    const [data, setData] = useState()
    const [timestamps, setTimestamps] = useState([])

    let stockValue = MockCharts.chart.result[0].indicators.adjclose[0].adjclose;

    /* let stockValueWeek = stockValue.splice((stockValue.length - 7), stockValue.length) */
    
    let stockValueWeek = [];
    const pastWeekValue = () => {
        for(let i = 0; i < 7; i++){
            console.log(stockValue[i])
            stockValueWeek.unshift(stockValue[stockValue.length - (i + 1)])
        }
    }

    pastWeekValue()
    
    console.log(stockValueWeek)

    let newArr = []
    let timeArr = MockCharts.chart.result[0].timestamp;
    
    const pastWeekDates = () => {
        let date = new Date().toString().slice(4, 10);
        for(let i = 0; i < 6; i++){
            let d = new Date(timeArr[timeArr.length - (i + 1)] * 1000).toDateString()
            
            newArr.unshift(d.slice(4, 10))
        }
        newArr.push(date)        
    }
    pastWeekDates()
   
    
    
    const chartData = {
        labels: newArr, //data for X-axis
        datasets: [
          {
            label: 'index',
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: stockValueWeek //data for y-axis
          }
        ]
      };

    return (
        <>
            <h1>InfoPage LineChart</h1>

            <Line 
             data={chartData}
           /*   options={{
                 maintainAspectRatio: false
             }} */
            />
        </>
    )
}

export default InfopageLinechart
