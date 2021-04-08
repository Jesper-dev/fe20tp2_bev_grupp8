import styled from 'styled-components';

export const Wrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3.5rem;

    @media screen and (min-width: 1024px) {
        margin-bottom: 0;
        min-height: 100vh;
    }

    button {
        width: 90%;
        font-size: 0.9rem;
        margin: 8px;

        @media screen and (min-width: 1024px) {
            height: 50px;
            margin: 8px;
        }
    }

    .buttonWrapper {
        display: flex;
        align-items: center;
    }

    .prewDiv {
        height: 60px;
        width: 90%;
        display: flex;
        justify-content: space-around;
        margin: 8px;

        @media screen and (min-width: 1024px) {
            height: 70px;
            width: 20%;
            display: flex;
            justify-content: space-around;
        }
    }

    .prewDiv > div {
        border: 2px solid black;
        height: inherit;
        width: 25%;
    }
`;
