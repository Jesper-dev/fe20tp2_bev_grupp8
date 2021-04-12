import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ContentWrapper = styled.div`
    padding: 1rem;
    margin-bottom: 3.5rem;
    margin-left: calc(
        100vw - 100%
    ); // https://css-tricks.com/elegant-fix-jumping-scrollbar-issue/

    @media screen and (min-width: 1024px) {
        margin-left: 14rem;
    }
`;

export const HeaderWrapper = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

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

    .follow-info-wrapper {
        @media screen and (min-width: 1024px) {
            width: 100%;
            max-width: 16rem;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
        }
        width: 100%;
        max-width: 8rem;
        display: flex;
        flex-direction: column;
        /* justify-content: space-evenly; */
    }

    .followers-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        span:nth-child(2) {
            font-size: 0.8rem;
        }
    }

    .btn-and-wollower-wrapper {
        @media screen and (min-width: 1024px) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 40rem;
        }
        display: flex;
    }

    & > section {
        @media screen and (min-width: 1024px) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 40rem;
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
            gap: 0.75rem;

            img {
                margin: 0%;
                width: 4rem;
                height: 4rem;
            }

            span {
                font-size: 1.25rem;
                font-weight: 500;
            }
        }
    }
`;

export const MainWrapper = styled.main`
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
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
