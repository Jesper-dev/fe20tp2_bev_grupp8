import styled from 'styled-components';

export const ContentWrapper = styled.section`
    flex: 0.25;
    padding: 1rem 2rem 0 0;

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

    h1{
        text-align: center;
        padding-bottom: 2rem;
    }
`;
