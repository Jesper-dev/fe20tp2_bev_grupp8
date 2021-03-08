import styled from 'styled-components';

export const PortOverviewWrapper = styled.div`
    background-color: var(--body);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    padding: 1rem;

    border-radius: 8px;

    /*     border: 1px solid var(--body-secondary); */
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);

    h1 {
        font-size: 1.2rem;
        color: var(--body-fifth);
    }

    p {
        margin: 0.5rem 0 0 0;
    }
`;
