import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainWrapper = styled.main`
    /* height: 100vh; */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    /* background-color: var(--body); */
    /* margin-bottom: 56px; */
    /* width: 100%; */

    & > h1 {
        margin: 0;
        font-size: 1.75rem;
        text-align: center;
    }

    & > div {
        width: 100%;

        .chart-topbar-wrapper {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 1rem;
        }
    }

    .info-container {
        p {
            display: flex;
            align-items: center;
            box-shadow: var(--box-shadow-cards);
            border-radius: 0.25rem;
            padding: 0.5rem;
            margin: 0;
            font-size: 1.125rem;
        }
    }

    .buttonWrapper > input {
        width: 20%;
    }

    label {
        transition: all 1s ease-in-out;
    }
`;

export const WatchStockButton = styled.button`
    transition: all 0.5s ease-in-out;
    color: ${(props) => props.eyecolor};
    background: none;
    border: none;
    outline: none;
    margin-right: 18px;
    cursor: pointer;

    .fa-eye {
        padding-left: 4px;
        font-size: 1.2rem;
    }
`;

export const TradeBtns = styled(Link)`
    text-decoration: none;
    padding: 0.25rem 1rem;
    color: var(--clr-primary);
    background: none;
    border: 0.125rem solid var(--clr-primary);
    outline: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 400;
    font-family: inherit;
    //margin-left: 15px;
    margin: 15px;

    transition: background-color 150ms linear, color 100ms linear;
    &:hover{
        background: var(--clr-primary);
        color: var(--body);
    }
    a:focus {
        box-shadow: var(--box-shadow-focus);
    }

    a:not(:focus-visible) {
        box-shadow: none;
    }

    .buttonWrapper {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    a:visited {
        text-decoration: none;
    }
`;
