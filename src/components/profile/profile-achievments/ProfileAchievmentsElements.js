import styled from 'styled-components';

export const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 40rem;

    gap: 1rem;

    padding: 6rem 8rem 8rem 8rem;

    @media screen and (max-width: 550px) {
        padding: 0px;
    }

    .trophy {
        /*     z-index: -1;
        position: relative; */
        height: 80px;
        width: auto;

        @media screen and (max-width: 550px) {
        height: 50px;
    }
    }
    .topbar-wrapper {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        flex-direction: row;
    }

    hr {
        align-self: flex-start;
        width: 100%;
        border: none;
        /* max-width: 500px; */
        margin: 0;
        height: 1px;
        color: #8e8e88; /* old IE */
        background-color: #dbdbdb; /* Modern Browsers */
    }
    /* padding: 8rem; */

    /*     div {
            width: 100%;
    max-width: 40rem;
    } */
`;

export const AchievmentsCardWrapper = styled.article`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    /*    padding: 0 1rem; */
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    box-shadow: var(--box-shadow-cards);
    width: 100%;
    min-height: 3rem;
    border: ${(props) => (props.checked ? '1px solid gold' : 'none')};
    background: var(--body);
    cursor: pointer;
    /*     margin-top: 8px; */
    opacity: ${(props) => (props.done ? '100%' : '40%')};

    transition: box-shadow 180ms ease-in-out;

    button{
        display: ${(props) => (props.done ? 'flex' : 'none')};
    }

    .svg-btn {
        cursor: pointer;
        background: none;
        border: none;
    }

    section {
        width: 100%;
        display: flex;
        align-items: flex-start;
    }

    &:hover {
        box-shadow: var(--box-shadow-cards-hover);
    }
    .text-wrapper {
        padding-left: 2rem;
        display: flex;
        flex-direction: column;
        /*         justify-content: flex-start; */
        span:nth-child(1) {
            font-weight: 600;
        }
    }
    & > span {
        /* flex: 1; */
        font-size: 0.9rem;
        /* width: 10%; */
        font-weight: 600;
        text-align: center;
        white-space: nowrap;
    }

    input {
        display: ${(props) => (props.done ? 'block' : 'none')};
        padding: 8px;
        cursor: pointer;
    }
`;
