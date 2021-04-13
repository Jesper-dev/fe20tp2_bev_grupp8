import React, {useState, useEffect, useContext} from 'react';
import StockCard from '../card/stock-card/StockCard';
import StockCardSmall from '../card/stock-card-small/StockCardSmall';

import { ContentWrapper } from './CustomComponentsElements';
import { GenericVestBtn } from '../button/ButtonElements';
import { FirebaseContext } from '../../firebase/context';

import SectionDataIndicator from '../card/section-data-indicator/SectionDataIndicator';

const FollowingHome = ({ array, gap, stockscardsmall }) => {
    let LabelsArr = [
        <i className="fas fa-globe"></i>,
        'symbol',
        'price',
        'change 24h ▾',
    ];

    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const [loadmore, setLoadmore] = useState(true);
    const [watching, setWatching] = useState([]);
    const [initArr, setInitArr] = useState([]);
    const [firstArr, setFirstArr] = useState([]);

    useEffect(() => {
        loadCryptosInit()

            //  (async () => {
            //         await axios
            //             .get(
            //                 `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
            //             )
            //             .then((response) => {
            //                 setCryptoData(response.data);
            //             console.log('hey')
            //                 setLoading(false);
            //             })
            //             .catch((error) => {
            //                 console.error(error);
            //             });
            //     })();
            // return () => {
            //     setLoading(false)
            // }
        }, []);

        const loadCryptosInit = () => {
            firebase.user(user.uid).child('/followingStocks').once('value', (snapshot) => {
                const data = snapshot.val()
                let arr = []
                let newList = []
                for (const key in data) {
                    arr.push({ ...data[key] });
                }
                setInitArr(arr)
                for(let i = 0; i < 3; i++) {
                    newList.push(arr[i])
                }
                setWatching(newList)
                setFirstArr(newList)
            })
        };

        const loadStocks = (init, first) => {
            let newList = []
            if(loadmore == true) {
                setWatching(init)
            } else {
                setWatching(first)
            }
            console.log(newList)
            setLoadmore(!loadmore)
        };
    return (
        <>
            <ContentWrapper gap={gap}>
                <h3>Watching Securities</h3>
                <SectionDataIndicator LabelsArr={LabelsArr} />
                {watching.length === 0 ? (
                    <p>
                        You are not following any stocks or cryptocurrencies at
                        the moment! Use the Discover page to find stocks and
                        cryptocurrencies of your interest.
                    </p>
                ) : (
                    ''
                )}
                {stockscardsmall ? (
                    <>
                        {watching.map((item, index) => {
                            return (
                                <StockCardSmall
                                    stocksList={array}
                                    key={index}
                                    name={item.symbol}
                                    cost={item.regularMarketPrice.raw}
                                    percent={item.regularMarketChangePercent}
                                />
                            );
                        })}
                    </>
                ) : (
                    <>
                        {watching.map((item, index) => {
                            return (
                                <StockCard
                                    stocksList={array}
                                    key={index}
                                    name={item.symbol}
                                    cost={item.regularMarketPrice.raw}
                                    percent={item.regularMarketChangePercent}
                                />
                            );
                        })}
                    </>
                )}

                {/*       {array.slice(0, 3).map((item, index) => {
                    return (
                        <StockCard
                            stocksList={array}
                            key={index}
                            name={item.symbol}
                            cost={item.regularMarketPrice.raw}
                            percent={item.regularMarketChangePercent}
                        />
                    );
                })} */}
                <GenericVestBtn
            onClick={() => loadStocks(initArr, firstArr)}
            pad='8px'
            border='1px solid black'
            br='10px'
            bg='var(---clr-primary)'
            co='var(---clr-secondary)'
            wid='10%'
            fz='0.9rem'
            >
                {loadmore ? 'Show more' : 'Show Less'}
            </GenericVestBtn>
            </ContentWrapper>
        </>
    );
};

export default FollowingHome;
