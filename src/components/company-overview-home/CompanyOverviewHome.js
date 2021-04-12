import React from 'react';

import ContentWrapper from '../shared/wrappers/ContentWrapper';
import CompHottestStocks from './comp-hottest-stocks/CompHottestStocks';

const CompanyOverviewHome = () => {
    return (
        <ContentWrapper>
            <CompHottestStocks />
        </ContentWrapper>
    );
};

export default CompanyOverviewHome;
