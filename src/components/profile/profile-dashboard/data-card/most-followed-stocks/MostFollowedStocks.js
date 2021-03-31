import React, { useEffect, useContext, useState } from 'react';
import { Bar, Pie, Chart } from 'react-chartjs-2';

import { FirebaseContext } from '../../../../firebase/context';

import { ContentWrapper } from './MostFollowedStocksElement';

const MostFollowedStocks = ({ orgName }) => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const [orgDataState, setOrgDataState] = useState([]);
    /*   const [maxElState, setMaxElState] = useState([]) */
    const [mostFollowedTopState, setMostFollowedTopState] = useState([]);
    const [stockLabelsState, setStockLabelsState] = useState([]);
    const [stockAmountState, setStockAmountState] = useState([]);
    const [showBar, setShowBar] = useState(false);

    let orgFollowArray = [];
    // let sortedArray = [];
    let orgData = [];
    let mostFollowedTop = [];
    let maxElState = [];
    let stockAmount = [];
    let stockLabels = [];

    // const findMostFrequent = (arr) => {
    //     return arr
    //         .reduce((acc, cur, ind, arr) => {
    //             if (arr.indexOf(cur) === ind) {
    //                 console.log('hej')
    //                 return [...acc, [cur, 1]];
    //             } else {
    //                 acc[acc.indexOf(acc.find((e) => e[0] === cur))] = [
    //                     cur,
    //                     acc[acc.indexOf(acc.find((e) => e[0] === cur))][1] + 1,
    //                 ];
    //                 console.log('Hejsan')
    //                 maxElState = acc;
    //                 return acc;
    //             }
    //         }, [])
    //         .sort((a, b) => b[1] - a[1])
    //         .filter((cur, ind, arr) => cur[1] === arr[0][1])
    //         .map((cur) => cur[0]);
    // };

    function foo(arr) {
    var a = [],
    b = [],
    prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
     if (arr[i] !== prev) {
         a.push(arr[i]);
        b.push(1);
     } else {
         b[b.length - 1]++;
     }
     prev = arr[i];
    }

    return [a, b];
}

    // function findMostFrequest(arr) {
    //     let compare = "";
    //     let mostFreq = "";

    //     arr.reduce((acc, val) => {
    //       if (val in acc) { // if key already exists
    //         acc[val]++; // then increment it by 1
    //       } else {
    //         acc[val] = 1; // or else create a key with value 1
    //       } if (acc[val] > compare) { // if value of that key is greater than the compare value.
    //         compare = acc[val]; // than make it a new compare value.
    //         mostFreq = val; // also make that key most frequent.

    //       } return acc;
    //     }, {})

    //     console.log("Most Frequent Item is:", mostFreq);
    // }

    useEffect(() => {
        firebase
            .organization(user.organization)
            .child('/users')
            .once('value', (snapshot) => {
                const followedStocks = snapshot.val();
                if (!followedStocks) return;
                for (const key in followedStocks) {
                    orgData.push({ ...followedStocks[key] });
                }
                makeArray(orgData);
            });
    }, []);

    //*This makes the array with all the stocks being followed in the organization
    const makeArray = (arr) => {

        let j = 0;
        let i = 0;
        while (j < arr.length) {
            let keys = Object.keys(arr[j].followingStocks);
            if (arr[j].followingStocks[keys[i]] === undefined) {
                i = 0;
                j++;
            } else {
                orgFollowArray.push(arr[j].followingStocks[keys[i]]);
                i++;
            }
        }
        setOrgDataState(orgFollowArray);
        // findMostFrequest(orgFollowArray);
        makeFinalArr(maxElState);

        let thisisarr = foo(orgFollowArray)

        console.log(thisisarr)
    };



    const makeFinalArr = (arr) => {
        console.log(arr);
        arr.forEach((item) => {
            stockAmount.push(item[1]);
            stockLabels.push(item[0]);
            setStockAmountState(stockAmount);
            setStockLabelsState(stockLabels);

            const objFull = {
                name: item[0],
                count: item[1],
            };
            mostFollowedTop.push(objFull);
        });
        setMostFollowedTopState(mostFollowedTop);
    };

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
            <h4>Mosts Followed Stocks</h4>
            <button onClick={() => setShowBar(!showBar)}>
                {showBar ? (
                    <i className="fas fa-chart-pie"></i>
                ) : (
                    <i className="far fa-chart-bar"></i>
                )}
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
};

export default MostFollowedStocks;
