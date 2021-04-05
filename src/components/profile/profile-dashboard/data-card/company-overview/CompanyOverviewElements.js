import styled from 'styled-components';

export const CompanyOverviewWrapper = styled.div`
    display: flex;
    gap: 0.5rem;

    & > article {
        flex: 1;
    }

    @media screen and (max-width: 640px) {
        flex-wrap: wrap;
    }
`;
