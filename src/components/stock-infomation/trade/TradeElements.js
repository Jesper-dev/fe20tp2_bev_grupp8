import styled from 'styled-components';

export const MainWrapper = styled.main`
/*     display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: var(--box-shadow-cards);
    margin: auto;
    background: var(--body); */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
/*     background-color: aliceblue; */

    .tmp-wrapper {
        height: 500px;
        width: 320px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: var(--box-shadow-cards);
        background: var(--body);

    }

    h2 {
        margin: 0;
    }

    .buttonWrapper {
     /*    border: 1px solid black; */
        height: 8%;
        width: 80%;
        display: flex;
        justify-content: space-around;
    }

    .buttonWrapper > button {
        width: 25%;
    }

    .amountWrapper {
        margin-bottom: 32px;
    }

    .amountWrapper > input {
        width: 15%;
        height: 50%;
        margin: 8px;
    }
`;
