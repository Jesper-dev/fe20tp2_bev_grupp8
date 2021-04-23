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

    svg{
        width: auto;
        height: 24rem;
    }

    header {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      /*   max-width: 80rem; */
    }

    h1,
    h2 {
        font-size: 2.2rem;
        width: 100%;
        text-align: center;
        color: var(--secondary);
        /* color: var(--clr-almost-black); */
    }

    p {
        font-size: 1.2rem;
        text-align: center;
        max-width: 45rem;
        font-weight: 600;
        color: var(--clr-almost-black);
    }

    .contact-wrapper {

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .contact-wrapper > a {
        text-decoration: none;

        color: white;
    }

    .contact-wrapper > a:hover {

        opacity: 50%;

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
        p{
            font-size: 0.9rem;
        }
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
