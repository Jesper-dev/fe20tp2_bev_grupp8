import styled from 'styled-components';

export const ContentWrapper = styled.div`
    //height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-around;
    /*     margin: 8px; */
    margin-bottom: 56px;

    h2 {
        display: flex;

        svg {
            margin-left: 8px;
        }
    }

    div {
        margin-bottom: 8px;
    }
`;

export const StockWrapper = styled.div`
    //height: 2vh;
    // margin: 16px;
`;
