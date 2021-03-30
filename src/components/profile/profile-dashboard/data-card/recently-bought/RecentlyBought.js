import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../../../../firebase/context';
import { ContentWrapper } from './RecentlyBoughtElements';

const RecentlyBought = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));
    const [dataDB, setDataDB] = useState({});

    useEffect(() => {
        let dataList = [];
        firebase
            .organization(user.organization)
            .child('/recentlyBought')
            .on('value', (snapshot) => {
                const data = snapshot.val();
                for (const key in data) {
                    dataList.push({ ...data[key] });
                }
                setDataDB(dataList[0]);
            });
    }, []);

    console.log(dataDB);

    return (
        <ContentWrapper>
            <h4>Recently Bought Stock</h4>
            <div className="info-wrapper">
                <p>{dataDB.user}</p>
                <p>{dataDB.symbol}</p>
                <p>Amount: {dataDB.amount}</p>
                <p>{dataDB.price * dataDB.amount}</p>
            </div>
        </ContentWrapper>
    );
};

export default RecentlyBought;
