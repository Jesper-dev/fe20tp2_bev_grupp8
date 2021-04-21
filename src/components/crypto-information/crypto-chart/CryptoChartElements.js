import styled from 'styled-components'

export const ContentWrapper = styled.div`
    .chartjs-render-monitor {
        width: 90vw !important;
        max-width: 750px;
    }

    /* img{
        width: 70px;
        height: 70px;
    } */

    .chart-topbar-wrapper {
        display: flex;
        justify-content: flex-end;
        font-size: 1rem;
        color: var(--body-fourth);
    }
`;

export const InLineDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
/*     justify-content: flex-start; */
    margin: 15px 0 0 35px;

    img{
        width: 45px;
        height: 45px;
    }
`