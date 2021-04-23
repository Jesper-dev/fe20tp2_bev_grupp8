import styled from 'styled-components';

export const ContentWrapper = styled.main`
    display: flex;
    flex-direction: column;
    /*     text-align: center; */
    /*     justify-content: center; */

    /*    justify-content: space-around; */
    /*     align-items: center; */
    /*     height: 100%; */
    /*     width: inherit; */
    gap: 1rem;

    header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    h1,
    h2 {
        text-align: center;
        color: var(--clr-almost-black);
    }

    p {
        text-align: center;
        max-width: 50rem;
        color: var(--clr-almost-black);
    }
`;

export const About = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--secondary);

    article {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    p,
    h3,
    h4 {
        margin: 0.3rem;
        text-align: center;
        color: #fff;
        max-width: 20rem;
    }

    img {
        border-radius: 50%;
        height: 12rem;
    }

    /* > div {

    } */

    /*     div {
        width: 12rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 0.25rem;
        background-color: white;

        svg {
            width: 120px;
            height: 120px;
        }
    } */
`;
