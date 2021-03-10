import styled from 'styled-components';

export const PortOverviewWrapper = styled.div`
    background-color: var(--body);
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    width: 80%;
    padding: 1rem;

    border-radius: 8px;

    /*     border: 1px solid var(--body-secondary); */
    box-shadow: 1px 1px 3px 1px rgb(0 0 0 / 25%);

    h6 {
        font-size: 0.9rem;
        color: var(--primary);
        margin: 0;
    }
    h1 {
        font-size: 1.2rem;
        color: var(--body-fifth);
    }

    p {
        margin: 0.5rem 0 0 0;
    }
`;
