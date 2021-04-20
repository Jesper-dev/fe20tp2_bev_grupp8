import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    .emoji {
        gap: 0;
        cursor: pointer;
    }

    /* .btn-and-follower-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0.75rem 0;
        width: 100%;
    } */

    .first-wrapper {
        display: flex;
        flex-direction: column;
    }

    .main-wrapper {
        gap: 2.75rem;
    }

    .name-emoji {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.25rem;
        margin: 0;
    }

    .achievments-wrapper {
        display: flex;
        flex-direction: column;
    }

    .achievments-wrapper > p {
        font-size: 0.8rem;
        background: none;
    }

    .follower-wrapper {
        flex: 1 1 auto;
        flex-direction: row;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;

        div {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        div > p {
            font-size: 1.25rem;
        }

        div > span {
            font-size: 0.8rem;
        }
    }

    .btn-wrapper {
        flex: 1 1 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    .emoji-picker-wrapper {
        @media screen and (min-width: 1024px) {
            justify-content: flex-end;
        }
    }

    .emoji-picker-react {
        @media screen and (min-width: 1600px) {
            right: 100;
            width: 20%;
            position: absolute;
            top: 10;
        }
        @media screen and (min-width: 1400px) {
            right: 100;
            width: 20%;
            position: absolute;
            top: 10;
        }
        width: 100%;
    }

    & > section {
        @media screen and (min-width: 1024px) {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
            max-width: 40rem;
            flex-direction: column;
        }
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 40rem;

        & > div {
            display: flex;
            align-items: center;

            img {
                margin: 0%;
                width: 5rem;
                height: 5rem;
            }

            span {
                font-size: 1.25rem;
                font-weight: 500;
            }
        }
    }

    .fa-money-bill-wave {
        color: goldenrod;
    }
`;

export const MainWrapper = styled.main`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 0.5rem 2rem;
`;

export const ProfileSettingsBtn = styled(Link)`
    display: inline-block;
    padding: 0.375rem 0.5rem;
    border-radius: 0.25rem;
    color: var(--clr-primary__dimmer);
    text-decoration: none;
    transition: background-color 125ms linear;

    &:hover {
        background-color: #e8e8e8;
    }

    i {
        margin-right: 0.25rem;
        vertical-align: top;
    }
`;
