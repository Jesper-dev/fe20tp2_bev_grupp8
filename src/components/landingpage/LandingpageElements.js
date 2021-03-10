import styled from 'styled-components';

export const ContentWrapper = styled.div`
    /* height: 100vh; */
    height: 100%;
    display: flex;
    flex-flow: nowrap column;
    align-items: center;

    h2 {
        color: var(--primary);
    }

    > p {
        font-weight: bold;
        text-align: center;
    }

    div {
        height: 15%;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .money-svg {
        /* width: 80%; */
        /* height: 50%; */
        width: 100px;
        height: 100px;
    }
`;
