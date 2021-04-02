import React, { useState } from 'react';
import MostFollowedStocks from '../most-followed-stocks/MostFollowedStocks';
import MostFollowedCrypto from '../most-followed-crypto/MostFollowedCrypto';

import { ContentWrapper } from './BarChartCardElements';

const BarChartCard = () => {
    const [stocks, setStocks] = useState(false);

    return (
        <>
            <ContentWrapper>
                <button onClick={(e) => setStocks(!stocks)}>ClickMe</button>
                {stocks ? <MostFollowedStocks /> : <MostFollowedCrypto />}
            </ContentWrapper>
        </>
    );
};

export default BarChartCard;
