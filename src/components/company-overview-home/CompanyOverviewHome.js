import React from 'react';

import { ContentWrapper } from './CompanyOverviewHomeElements';
import CompHottestStocks from './comp-hottest-stocks/CompHottestStocks';
import CompHottestCrypto from './comp-hottest-crypto/CompHottestCrypto';
import CompRecentlyPosted from './comp-recently-posted/CompRecentlyPosted';
import CompRecentlyBoughtStock from './comp-recently-bought/CompRecentlyBoughtStock'
import CompRecentlySoldStock from './comp-recently-sold/CompRecentlySoldStock'

const CompanyOverviewHome = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    return (
        <ContentWrapper>
            <h1>{user.organization} recently</h1>

            <CompRecentlyPosted />
            <div>
                <CompRecentlyBoughtStock />
                <CompRecentlySoldStock />
                <CompHottestCrypto />
                <CompHottestStocks />
            </div>
        </ContentWrapper>
    );
};

export default CompanyOverviewHome;
