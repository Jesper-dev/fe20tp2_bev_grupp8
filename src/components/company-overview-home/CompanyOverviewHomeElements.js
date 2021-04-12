import styled from 'styled-components';

export const ContentWrapper = styled.section`
    flex: 0.25;
    padding: 2rem 2rem 2rem 0rem;

    & > div {
        /* display: grid;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); */
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    @media screen and (max-width: 1024px) {
        display: none;
    }
    /*     display: flex;
    justify-content: center; */
    /*  align-items: flex-start; */
    /*     flex-wrap: wrap; */
    /*         max-width: 30rem;

    gap: 1rem; */

    /*    & > header > h1 {
        text-align: center;
        width: 100%;
    } */
    & > header {
        width: 100%;
    }
    /*   &:first-child {
        width: 100%;
    } */
`;
