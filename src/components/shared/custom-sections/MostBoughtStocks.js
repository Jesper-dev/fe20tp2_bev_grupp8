import React, { useEffect, useContext, useState } from 'react';

import StockCard from '../card/stock-card/StockCard';
import { useSelector } from 'react-redux';
import { setUsers } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import { FirebaseContext } from '../../firebase/context';
import { SectionWrapper } from './CustomComponentsElements';

import SectionDataIndicator from '../card/section-data-indicator/SectionDataIndicator';

const MostBoughtStocks = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const [orgDataListState, setOrgDataListState] = useState([]);
    const [orgBoughtData, setOrgBoughtData] = useState(null);

    const FetchedStockList = useSelector(state => state.FetchedStockList)
    let LabelsArr = ['region', 'symbol', 'price', 'change 24h ▾'];

    useEffect(() => {
        let orgDataArr = [];
        let orgData = firebase.users();
        orgData.on('value', (snapshot) => {
            const boughtStocks = snapshot.val();
            if (!boughtStocks) return;
            for (const key in boughtStocks) {
                orgDataArr.push({ ...boughtStocks[key] });
            }
            setOrgDataListState(orgDataArr);
            dispatch(setUsers(orgDataArr));
            makeBoughtArray(orgDataArr);
        });
    }, []);

    const ReduceFunc = (arr) => {
        let result = [];
        arr.forEach(function (a) {
            if (!this[a.symbol]) {
                this[a.symbol] = { symbol: a.symbol, amount: 0 };
                result.push(this[a.symbol]);
            }
            this[a.symbol].amount += a.amount;
        }, Object.create(null));
        return result;
    };

    const makeBoughtArray = (arr) => {
        let orgStockPossessionArr = [];
        let j = 0;
        let i = 0;
        while (j < arr.length) {
            let keys = Object.keys(arr[j].possessionStocks);
            if (arr[j].possessionStocks[keys[i]] === undefined) {
                i = 0;
                j++;
            } else {
                orgStockPossessionArr.push({
                    symbol: arr[j].possessionStocks[keys[i]].symbol,
                    amount: arr[j].possessionStocks[keys[i]].amount,
                    username: arr[j].username,
                });
                i++;
            }
            const sortByAmount = (arr) => {
                arr.sort(function (a, b) {
                    return a.amount - b.amount;
                });
            };
            let reducedArray = ReduceFunc(orgStockPossessionArr);

            sortByAmount(reducedArray);

            reducedArray.reverse().splice(3, reducedArray.length);

            setOrgBoughtData(reducedArray);


        }
    };


    const findIndex = (item) => {
        let index = FetchedStockList[FetchedStockList.findIndex(x => x.symbol == item.symbol)]
        if(index == -1 ){
            return index = 0
        }
        return index
    }


    return (
        <SectionWrapper>
            <h3>
                Hottest stocks{' '}
                <i className="fas fa-fire-alt" style={{ color: 'orange' }}></i>
            </h3>
            <SectionDataIndicator LabelsArr={LabelsArr} />
            {!FetchedStockList.length > 0 || !orgBoughtData ? null : (
<>
                {orgBoughtData.map((item, index) => {
                    return (
                        <StockCard
                            key={index}
                            name={findIndex(item)?.symbol ?? 'LV'}
                            shortname={findIndex(item)?.shortName ?? 'Lets-vest'}
                            cost={findIndex(item)?.regularMarketPrice ?? 250}
                            percent={findIndex(item)?.regularMarketChangePercent ?? 2.25}
                                />
                        );
                    })}
</>
                    )}
        </SectionWrapper>
    );
};

export default MostBoughtStocks;
