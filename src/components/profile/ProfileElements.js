import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    .btn-and-follower-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0.75rem 0;
        width: 100%;

        .follower-wrapper {
            flex: 1 1 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.5rem;

            span {
                font-size: 1rem;
            }
        }

        .btn-wrapper {
            flex: 1 1 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
        }
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

    .achievments-wrapper{
        display: flex;
    }

    .fa-money-bill-wave{
        color: goldenrod;
    }
`;

export const MainWrapper = styled.main`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 2rem 0;
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
