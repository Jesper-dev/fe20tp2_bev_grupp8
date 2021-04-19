import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainWrapper = styled.main`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* flex-direction: column; */
    /* align-items: center; */
    gap: 1rem;

    & > h1 {
        width: 80%;
        margin: 0;
        font-size: 1.5rem;
        text-align: center;
    }

    .chart-container {
        flex: 0.75;
        max-width: 100%;

        .chart-topbar-wrapper {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 2rem;
            margin: 0.75rem 0;
        }
    }

    .info-container {
        & > article {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 0.5rem 0.375rem;
            box-shadow: var(--box-shadow-cards);
            margin-bottom: 2rem;

            & > label > p {
                box-shadow: none;
                padding: 0;
                margin: 0;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 8;
                -webkit-box-orient: vertical;
                overflow: hidden;
                line-height: 1.4;
            }

            #expanded {
                display: none;
            }

            #expanded:checked + label > p {
                -webkit-line-clamp: unset;
            }

            & > label {
                cursor: pointer;
            }
        }

        p {
            box-shadow: var(--box-shadow-cards);
            border-radius: 0.25rem;
            padding: 0.375rem;
            margin: 0 0 0.75rem 0;
            font-size: 1.125rem;;
        }
    }
`;

export const WatchStockButton = styled.button`
    padding: 0.625rem;
    border-radius: 50%;
    transition: all 0.25s ease-in-out;
    color: ${(props) => props.eyecolor};
    background: none;
    border: none;
    outline: none;
    margin: 0;
    cursor: pointer;

    &:hover {
        background-color: #e8e8e8;
    }

    .fa-eye {
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
    margin: 0;

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
