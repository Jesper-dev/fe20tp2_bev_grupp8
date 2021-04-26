import styled from 'styled-components';

export const FooterElement = styled.footer`
    margin-top: 1rem;
    /*     padding-top: 8vh; */
    /*   height: 10vh; */
    background: var(--secondary);

    > main {
        display: flex;
        justify-content: space-evenly;

        .content-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 100%;
            max-width: 40rem;
        }
    }

    .section-wrapper {
        display: flex;
        flex-direction: column;

        gap: 0.5rem;
        padding: 1rem;

        color: #fff;

        h2 {
            font-size: 1rem;
            margin: 0;
        }
    }

    .contact-wrapper {
        display: flex;
        flex-direction: column;

        gap: 0.5rem;
        padding: 1rem;

        color: #fff;

        h2 {
            margin: 0;
        }
    }
`;
