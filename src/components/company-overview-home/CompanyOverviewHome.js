import React from 'react';

import { ContentWrapper } from './CompanyOverviewHomeElements';
import CompHottestStocks from './comp-hottest-stocks/CompHottestStocks';
import CompRecentlyPosted from './comp-recently-posted/CompRecentlyPosted';

const CompanyOverviewHome = () => {
    return (
        <ContentWrapper>
            <h1>Swedbank recently</h1>
            <div>
                <CompRecentlyPosted />
                <CompHottestStocks />
                <CompHottestStocks />
                <CompHottestStocks />
                <CompHottestStocks />
                <CompHottestStocks />
            </div>
        </ContentWrapper>
    );
};

export default CompanyOverviewHome;
