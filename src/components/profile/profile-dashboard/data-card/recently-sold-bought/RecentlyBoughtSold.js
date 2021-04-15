import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../../../../firebase/context';
import { ContentWrapper } from './RecentlyBoughtSoldElements';

import { fetchUsersOrgSnapshotArray } from '../../../../shared/functions/firebase-functions'

const RecentlyBought = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));
    const [bought, setBought] = useState([]);
    const [boughtCrypto, setBoughtCrypto] = useState([]);
    const [sold, setSold] = useState([]);
    const [soldCrypto, setSoldCrypto] = useState([]);

    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        setDidMount(true);

        fetchUsersOrgSnapshotArray(firebase, user.organization, '/recentlyBought', setBought)
        fetchUsersOrgSnapshotArray(firebase, user.organization, '/recentlyBoughtCrypto', setBoughtCrypto)
        fetchUsersOrgSnapshotArray(firebase, user.organization, '/recentlySold', setSold)
        fetchUsersOrgSnapshotArray(firebase, user.organization, '/recentlySoldCrypto', setSoldCrypto)

        return () => {
            setDidMount(false);
        };
    }, []);


    console.log(bought)

    return (
        <ContentWrapper>
            {bought.length == 0 || sold.length == 0 || boughtCrypto.length == 0 || soldCrypto.length == 0 ? ( null ) : (
<>
                <Table
                title="Recently bought stock"
                user={bought[0].user}
                symbol={bought[0].symbol}
                amount={bought[0].amount}
                price={bought[0].price}
                />
            <Table
            title="Recently sold stock"
            user={sold[0].user}
            symbol={sold[0].symbol}
            amount={sold[0].amount}
            price={sold[0].price}
            />
            <Table
            title="Recently bought cryptocurrency"
            user={boughtCrypto[0].user}
            symbol={boughtCrypto[0].symbol}
            amount={boughtCrypto[0].amount}
            price={boughtCrypto[0].price}
            />
            <Table
        title="Recently sold cryptocurrency"
        user={soldCrypto[0].user}
        symbol={soldCrypto[0].symbol}
        amount={soldCrypto[0].amount}
        price={soldCrypto[0].price}
         />
    </>
    )}
        </ContentWrapper>
    );
};
export const Table = ({ title, user, symbol, amount, price }) => {
    return (
        <>
            <h4>{title}</h4>
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
                    <td> {user}</td>
                    <td> {symbol}</td>
                    <td>{amount}</td>
                    <td> {(price * amount).toFixed(2)}$</td>
                </tr>
            </table>
        </>
    );
};

export default RecentlyBought;
