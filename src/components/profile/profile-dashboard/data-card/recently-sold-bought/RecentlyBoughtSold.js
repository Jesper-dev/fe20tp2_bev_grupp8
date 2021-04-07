import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../../../../firebase/context';
import { ContentWrapper } from './RecentlyBoughtSoldElements';

const RecentlyBought = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));
    const [bought, setBought] = useState({});
    const [dataDB, setDataDB] = useState({});
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        setDidMount(true);
        let dataListBougth = [];
        let dataListSold = [];
        firebase
            .organization(user.organization)
            .child('/recentlyBought')
            .once('value', (snapshot) => {
                const bought = snapshot.val();
                for (const key in bought) {
                    dataListBougth.push({ ...bought[key] });
                }
                setBought(dataListBougth[0]);
            });

        firebase
            .organization(user.organization)
            .child('/recentlySold')
            .once('value', (snapshot) => {
                const sold = snapshot.val();
                for (const key in sold) {
                    dataListSold.push({ ...sold[key] });
                }
                setDataDB(dataListSold[0]);
            });
        return () => {
            setDidMount(false);
        };
    }, [didMount, firebase, user.organization]);

    return (
        <ContentWrapper>
            <h4>Recently Bought Stock</h4>
            <table>
                <thead>
                    <tr>
                        <th>Username ▾</th>
                        <th>Stock ▾</th>
                        <th>Amount ▾</th>
                        <th>Price ▾</th>
                    </tr>
                </thead>

                <tr>
                    <td> {bought.user}</td>
                    <td> {bought.symbol}</td>
                    <td>{bought.amount}</td>
                    <td> {(bought.price * bought.amount).toFixed(2)}$</td>
                </tr>
            </table>

            <h4>Recently Sold Stock</h4>
            <table>
                <thead>
                    <tr>
                        <th>Username ▾</th>
                        <th>Stock ▾</th>
                        <th>Amount ▾</th>
                        <th>Price ▾</th>
                    </tr>
                </thead>

                <tr>
                    <td> {dataDB.user}</td>
                    <td> {dataDB.symbol}</td>
                    <td>{dataDB.amount}</td>
                    <td> {(dataDB.price * dataDB.amount).toFixed(2)}$</td>
                </tr>
            </table>
        </ContentWrapper>
    );
};

export default RecentlyBought;
