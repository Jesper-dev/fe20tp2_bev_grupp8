import React,{ useEffect, useContext, useState} from 'react';
import { FirebaseContext } from '../../firebase/context';

// import { ContentWrapper } from './ProfilePortfolioElements'; //remove?
import PortfolioOverview from '../../shared/card/portfolio-overview/PortfolioOverviewCard';
import Possession from './profile-possession/Possession.js'

const ProfilePortfolio = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const [currency, setCurrency] = useState(0)

    useEffect(() => {
        firebase.user(user.uid).child('/currency/currency').once('value', (snapshot) => {
            const data = snapshot.val()
            if(!data) return
            setCurrency(data)
        })
    }, [firebase, user.uid]);
    return (
        <>
            <PortfolioOverview total={currency.toLocaleString()} />
            <Possession />
        </>
    );
};

export default ProfilePortfolio;
