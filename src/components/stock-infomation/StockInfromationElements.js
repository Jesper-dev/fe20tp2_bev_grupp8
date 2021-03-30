import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const ContentWrapper = styled.div`
    /* height: 100vh; */
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-color: var(--body);
    margin-bottom: 56px;

    h1 {
        text-align: center;
        margin: 32px 8px 8px 8px;
        font-size: 1.4rem;
    }

    .chartjs-render-monitor {
        width: 10vw;
    }

    .informationContainer {
        .holds-in-share {
        }
        margin-bottom: 56px;
        p {
            box-shadow: var(--box-shadow-cards);
            border-radius: 4px;
            padding: 8px;
            margin: 8px;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
        }
    }

    .buttonWrapper > input {
        width: 20%;
    }

    .stockinfo-map-wrapper {
        width: 100%;
    }

    .chart-topbar-wrapper {
        display: flex;
        justify-content: flex-end;
        font-size: 1rem;
        color: var(--body-fourth);
    }

    label {
        transition: all 1s ease-in-out;
    }

    input[type='checkbox'] {
        height: 24px;
        width: 24px;
        outline: none;
        border-radius: 0.7rem;
    }

    input[type='checkbox']:checked {
        animation: checked 0.5s;
    }

    input[type='checkbox']:not(:checked) {
        animation: unChecked 0.5s;
    }

    @keyframes checked {
        0% {
            transform: scale(0.75);
        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes unChecked {
        0% {
            transform: scale(0.75);
        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
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
    color: var(--secondary);
    background: none;
    border: 0.125rem solid var(--secondary);
    outline: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 400;
    font-family: inherit;
    margin-left: 15px;

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