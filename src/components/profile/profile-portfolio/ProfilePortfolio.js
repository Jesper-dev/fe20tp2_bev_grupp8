import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../firebase/context';
import { useDispatch } from 'react-redux';
import {
    setStockPossession,
    setCryptoPossession,
} from '../../../redux/actions';

// import { ContentWrapper } from './ProfilePortfolioElements'; //remove?
import PortfolioOverview from '../../shared/card/portfolio-overview/PortfolioOverviewCard';
import Possession from './profile-possession/PossessionStocks';
import PossessionCrypto from './profile-possession/PossessionCrypto';
import DistributionPortfolioChart from './profile-possession-chart/ProfilePossessionChart';

const ProfilePortfolio = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const dispatch = useDispatch();

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
    return (
        <>
            <PortfolioOverview total={currency.toLocaleString()} />
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
