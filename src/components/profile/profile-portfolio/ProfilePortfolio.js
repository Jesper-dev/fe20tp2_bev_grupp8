import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../firebase/context';

// import { ContentWrapper } from './ProfilePortfolioElements'; //remove?
import PortfolioOverview from '../../shared/card/portfolio-overview/PortfolioOverviewCard';
import Possession from './profile-possession/PossessionStocks';
import PossessionCrypto from './profile-possession/PossessionCrypto';
import DistributionPortfolioChart from './profile-possession-chart/DistributionPortfolioChart';

const ProfilePortfolio = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);

    const [currency, setCurrency] = useState(0);
    const [stocksPossesionState, setStocksPossesionState] = useState([]);
    const [cryptoPossesionState, setCryptoPossesionState] = useState([]);

    useEffect(() => {
        firebase
            .user(user.uid)
            .child('/currency/currency')
            .once('value', (snapshot) => {
                const data = snapshot.val();
                if (!data) return;
                setCurrency(data);
            });
        let possessioListCrypto = [];
        firebase
            .user(user.uid)
            .child('/possessionCrypto')
            .on('value', (snapshot) => {
                const possessionData = snapshot.val();
                if (!possessionData) return;
                for (const key in possessionData) {
                    possessioListCrypto.push({ ...possessionData[key] });
                }

                setCryptoPossesionState(possessioListCrypto);
            });

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
            });
    }, [firebase, user.uid]);
    return (
        <>
            <PortfolioOverview total={currency.toLocaleString()} />
            <Possession stocksPossesionState={stocksPossesionState} />
            <PossessionCrypto cryptoPossesionState={cryptoPossesionState} />
            <DistributionPortfolioChart
                cryptoPossesionState={cryptoPossesionState}
                stocksPossesionState={stocksPossesionState}
                currency={currency}
            />
        </>
    );
};

export default ProfilePortfolio;
