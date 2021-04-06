import React, { useState } from 'react';
import MostFollowedStocks from '../most-followed-stocks/MostFollowedStocks';
import MostFollowedCrypto from '../most-followed-crypto/MostFollowedCrypto';

import NavDrop from '../../../../shared/tab-bar-dropdown/TabBarDropDown';

import { ContentWrapper } from './DashboardChartCardElements';

const BarChartCard = () => {
    const [stocks, setStocks] = useState(false);
    const [pie, setPie] = useState(false);

    const setDataFunction = (e) => {
        let value = e.target.id;

        let valueOne = value.slice(0, 6);
        let valueTwo = value.slice(value.length - 3, value.length);

        if (valueTwo === 'pie') {
            setPie(true);
        } else {
            setPie(false);
        }

        if (valueOne === 'crypto') {
            setStocks(false);
        } else {
            setStocks(true);
        }
    };

    return (
        <>
            <ContentWrapper>
                <div className="drop-down-wrapper">
                    <NavDrop setDataFunction={setDataFunction} />
                </div>

                {stocks ? (
                    <MostFollowedStocks pie={pie} />
                ) : (
                    <MostFollowedCrypto pie={pie} />
                )}
            </ContentWrapper>
        </>
    );
};

export default BarChartCard;
