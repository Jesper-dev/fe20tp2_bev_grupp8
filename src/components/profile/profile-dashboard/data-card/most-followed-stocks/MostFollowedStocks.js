import React, {useEffect, useContext, useState} from 'react'
import { Bar, Pie, Chart } from 'react-chartjs-2';

import { FirebaseContext } from '../../../../firebase/context';

import { ContentWrapper } from './MostFollowedStocksElement'

const MostFollowedStocks = ({orgName}) => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext)
    const [orgDataState, setOrgDataState] = useState([])
  /*   const [maxElState, setMaxElState] = useState([]) */
    const [mostFollowedTopState, setMostFollowedTopState] = useState([])
    const [stockLabelsState, setStockLabelsState] = useState([])
    const [stockAmountState, setStockAmountState] = useState([])
    const [showBar, setShowBar] = useState(false)

    let orgFollowArray = [];
    // let sortedArray = [];
    let orgData = [];
    let mostFollowedTop = [];
    let maxElState = [];
    let stockAmount = [];
    let stockLabels = [];

    const findMostFrequent = (arr) => {
      return arr
        .reduce((acc, cur, ind, arr) => {
            if (arr.indexOf(cur) === ind) {
                return [...acc, [cur, 1]];
            } else {
                  acc[acc.indexOf(acc.find((e) => e[0] === cur))] = [
                    cur,
                    acc[acc.indexOf(acc.find((e) => e[0] === cur))][1] + 1,
                ];
                maxElState = acc
                return acc;
            }
        }, [])
        .sort((a, b) => b[1] - a[1])
        .filter((cur, ind, arr) => cur[1] === arr[0][1])
        .map((cur) => cur[0]);
    }

    useEffect(() => {
        const orgFollowedStocks = firebase.db.ref('organizations/' + user.organization + '/users');
            orgFollowedStocks.on('value', (snapshot) => {
            const followedStocks = snapshot.val();
            if (!followedStocks) return;
            for (const key in followedStocks) {
                orgData.push({ ...followedStocks[key] });
            }
            makeArray(orgData);
        });
    }, [])

    //*This makes the array with all the stocks being followed in the organization
    const makeArray = (arr) => {
        let j = 0;
        let i = 0;
        while(j < arr.length) {
            if(arr[j].followingStocks.array[i] === undefined){
                i = 0;
                j++
            } else {
                orgFollowArray.push(arr[j].followingStocks.array[i].symbol)
                i++;
            }
        }
        setOrgDataState(orgFollowArray)
        findMostFrequent(orgFollowArray)
        makeFinalArr(maxElState)
    }

    const makeFinalArr = (arr) => {
        arr.forEach((item) => {
            stockAmount.push(item[1])
            stockLabels.push(item[0])
            setStockAmountState(stockAmount)
            setStockLabelsState(stockLabels)
            const objFull = {
                name: item[0],
                count: item[1]
            }
            mostFollowedTop.push(objFull)
            
        })
        setMostFollowedTopState(mostFollowedTop)
    }

    let data = {
        labels: stockLabelsState,
        datasets: [
            {
                label: 'Most followed stocks',
                data: stockAmountState,
                backgroundColor: [
                    '#3e95cd',
                    '#8e5ea2',
                    '#3cba9f',
                    '#e8c3b9',
                    '#c45850',
                    '#3DAD9C',
                    '#4BFADF',
                    '#F964FA',
                    '#FADF7C',
                    '#AD34AD',
                ],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <ContentWrapper>
            <h4>{orgName} Mosts Followed Stocks</h4>
            <button onClick={() => setShowBar(!showBar)}>
                
                {showBar
                    ? <i class="fas fa-chart-pie"></i>
                    : <i class="far fa-chart-bar"></i>}
            </button>
            {showBar ? (
                <Bar
                    data={data}
                    options={{
                        maintainAspectRatio: false,
                        legend: {
                            display: false,
                        },
                    }}
                />
            ) : (
                <Pie
                    data={data}
                    options={{
                        maintainAspectRatio: false,
                        /*   legend: {
                    display: false,
                }, */
                    }}
                />
            )}
        </ContentWrapper>
    );
}

export default MostFollowedStocks
