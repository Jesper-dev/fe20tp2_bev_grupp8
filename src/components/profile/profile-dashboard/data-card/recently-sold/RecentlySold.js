import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../../../../firebase/context';
import { ContentWrapper } from './RecentlySoldElements';

const RecentlySold = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));
    const [dataDB, setDataDB] = useState({});
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        setDidMount(true);
        let dataList = [];
        firebase
            .organization(user.organization)
            .child('/recentlySold')
            .once('value', (snapshot) => {
                const data = snapshot.val();
                for (const key in data) {
                    dataList.push({ ...data[key] });
                }
                setDataDB(dataList[0]);
            });
        return () => {
            setDidMount(false);
        };
    }, [didMount, firebase, user.organization]);

    return (
        <ContentWrapper>
            <h4>Recently Sold Stock</h4>
            <div className="info-wrapper">
                <p><span>Username: </span>{dataDB.user}</p>
                <p><span>Stock: </span>{dataDB.symbol}</p>
                <p><span>Amount: </span> {dataDB.amount}</p>
                <p><span>Price: </span>{dataDB.price * dataDB.amount}$</p>
            </div>
        </ContentWrapper>
    );
};

export default RecentlySold;
