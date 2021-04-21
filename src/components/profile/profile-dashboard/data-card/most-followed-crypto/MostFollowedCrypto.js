import React, { useEffect, useContext, useState } from 'react';

import { Bar, Pie } from 'react-chartjs-2'; //changed!

import { FirebaseContext } from '../../../../firebase/context';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ContentWrapper } from './MostFollowedCryptoElements';

const MostFollowedCrypto = ({ orgName, pie }) => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const [orgDataState, setOrgDataState] = useState([]);
    const [mostFollowedTopState, setMostFollowedTopState] = useState([]);
    const [stockLabelsState, setStockLabelsState] = useState([]);
    const [stockAmountState, setStockAmountState] = useState([]);
    const [showBar, setShowBar] = useState(false);

    let orgFollowArray = [];
    let orgData = [];

    const foo = (arr) => {
        let a = [],
            b = [],
            prev;

        arr.sort();
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== prev) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length - 1]++;
            }
            prev = arr[i];
        }

        return [a, b];
    };

    useEffect(() => {
        firebase
            .organization(user.organization)
            .child('/users')
            .once('value', (snapshot) => {
                const followedCryptos = snapshot.val();
                if (!followedCryptos) return;
                for (const key in followedCryptos) {
                    orgData.push({ ...followedCryptos[key] });
                }
                makeArray(orgData);
            });
    }, []);

    //*This makes the array with all the stocks being followed in the organization
    const makeArray = (arr) => {
        let j = 0;
        let i = 0;
        while (j < arr.length) {
            let keys = Object.keys(arr[j].followingCrypto);
            if (arr[j].followingCrypto[keys[i]] === undefined) {
                i = 0;
                j++;
            } else {
                orgFollowArray.push(arr[j].followingCrypto[keys[i]].symbol);
                i++;
            }
        }
        setOrgDataState(orgFollowArray);
        let result = foo(orgFollowArray);
        makeFinalArr(result);
    };

    const makeFinalArr = (arr) => {
        setStockAmountState(arr[1]);
        setStockLabelsState(arr[0]);
    };

    let data = {
        labels: stockLabelsState,
        datasets: [
            {
                label: 'Most followed crypto',
                data: stockAmountState,
                backgroundColor: [
					'#2C3E50',
                    '#E74C3C',
                    '#F5A503',
                    '#9768D1',
                    '#3498DB',
                    '#40916c',
                    '#E9C46A',
                    '#F4A261',
                    '#1D3557',
                    '#FADF7C',
                    '#AD34AD',
                ],
                minBarLength: 50,
                hoverOffset: 1,
            },
        ],
    };

    let options = {
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <ContentWrapper>
            <h4>Most Followed Cryptos</h4>
            <TransitionGroup>
                {pie ? (
                    <CSSTransition
                        in={!showBar}
                        timeout={1500}
                        classNames="my-node"
                    >
                        <Pie
                            id="cry-chart"
                            data={data}
                            options={{
                                maintainAspectRatio: false,
                            }}
                        />
                    </CSSTransition>
                ) : (
                    <CSSTransition
                        in={showBar}
                        timeout={1500}
                        classNames="my-node"
                    >
                        <Bar id="cry-chart" data={data} options={options} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </ContentWrapper>
    );
};

export default MostFollowedCrypto;
