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
            <Table
                title="Recently bought stock"
                user={bought.user}
                symbol={bought.symbol}
                amount={bought.amount}
                price={bought.price}
            />
            <Table
                title="Recently sold stock"
                user={dataDB.user}
                symbol={dataDB.symbol}
                amount={dataDB.amount}
                price={dataDB.price}
            />
            <Table
                title="Recently bought cryptocurrency"
                user={dataDB.user}
                symbol={dataDB.symbol}
                amount={dataDB.amount}
                price={dataDB.price}
            />
            <Table
                title="Recently sold cryptocurrency"
                user={dataDB.user}
                symbol={dataDB.symbol}
                amount={dataDB.amount}
                price={dataDB.price}
            />
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
