import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../firebase/context';
import { useDispatch, useSelector } from 'react-redux';
import {
    setStockPossession,
    setCryptoPossession,
} from '../../../redux/actions';

// import { ContentWrapper } from './ProfilePortfolioElements'; //remove?
import PortfolioOverview from '../../shared/card/portfolio-overview/PortfolioOverviewCard';
import Possession from './profile-possession/PossessionStocks';
import PossessionCrypto from './profile-possession/PossessionCrypto';
import DistributionPortfolioChart from './profile-possession-chart/ProfilePossessionChart';
import FetchedStockValues from '../../../redux/reducers/FetchedStockValues';

import FetchUserAssets from '../../../api/user-api-components/FetchUserAssets'

const ProfilePortfolio = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const dispatch = useDispatch();

    const FetchedStockValues = useSelector((state) => state.FetchedStockValues);
    const FetchedCryptoValues = useSelector(
        (state) => state.FetchedCryptoValues
    );

    const [valueStocks, setValueStocks] = useState(0);
    const [valueCrypto, setValueCrypto] = useState(0);
    const [currency, setCurrency] = useState(0);
    const [stocksPossesionState, setStocksPossesionState] = useState([]);
    const [cryptoPossesionState, setCryptoPossesionState] = useState([]);

    useEffect(() => {
        /* SETS USER CURRENCY OF CRYPTO AS A REDUX STATE WHEN VISITIN PROFILE */
        firebase
            .user(user.uid)
            .child('/currency/currency')
            .once('value', (snapshot) => {
                const data = snapshot.val();
                if (!data) return;
                setCurrency(data);
            });

        /* SETS USER POSSEIONS OF CRYPTO AS A REDUX STATE WHEN VISITIN PROFILE */
        let possessioListCrypto = [];
        firebase
            .user(user.uid)
            .child('/possessionCrypto')
            .on('value', (snapshot) => {
                const possessionDataCrypto = snapshot.val();
                if (!possessionDataCrypto) return;
                for (const key in possessionDataCrypto) {
                    possessioListCrypto.push({ ...possessionDataCrypto[key] });
                }
                setCryptoPossesionState(possessioListCrypto);
                dispatch(setCryptoPossession(possessioListCrypto));
            });

        /* SETS USER POSSEIONS OF STOCK AS A REDUX STATE WHEN VISITIN PROFILE */
        let possessioListStocks = [];
        firebase
            .user(user.uid)
            .child('/possessionStocks')
            .on('value', (snapshot) => {
                const possessionData = snapshot.val();
                if (!possessionData) return;
                for (const key in possessionData) {
                    possessioListStocks.push({ ...possessionData[key] });
                }
                setStocksPossesionState(possessioListStocks);
                dispatch(setStockPossession(possessioListStocks));
            });
    }, [firebase, user.uid]);

    useEffect(() => {
        let totalCryptoValue = 0;
        let totalStockValue = 0;

        if (!FetchedCryptoValues || !FetchedStockValues) return;

        for (let i = 0; i < FetchedCryptoValues.length; i++) {
            totalCryptoValue =
                totalCryptoValue +
                FetchedCryptoValues[i].amount * FetchedCryptoValues[i].usd;
        }
        for (let i = 0; i < FetchedStockValues.length; i++) {
            totalStockValue =
                totalStockValue +
                FetchedStockValues[i].amount *
                    FetchedStockValues[i].regularMarketPrice;
        }

        setValueCrypto(totalCryptoValue);
        setValueStocks(totalStockValue);
        return () => {};
    }, [FetchedStockValues]);

    return (
        <>
            <FetchUserAssets stocksPossesionState={stocksPossesionState} cryptoPossesionState={cryptoPossesionState} currency={currency} />
            <PortfolioOverview
                total={currency.toLocaleString()}
                stockvalue={valueStocks}
                cryptovalue={valueCrypto}
            />
            <DistributionPortfolioChart
                cryptoPossesionState={cryptoPossesionState}
                stocksPossesionState={stocksPossesionState}
                currency={currency}
            />
            <Possession stocksPossesionState={stocksPossesionState} />
            <PossessionCrypto cryptoPossesionState={cryptoPossesionState} />
        </>
    );
};

export default ProfilePortfolio;
