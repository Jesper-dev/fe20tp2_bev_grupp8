import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ContentWrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 3.5rem;
    background-color: var(--body-secondary);

    @media screen and (min-width: 1024px) {
        margin-left: 14rem;
    }

    header {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 1rem;
        width: 100%;
        max-width: 40rem;
    }

    section {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .user-info {
            display: flex;
            align-items: center;
            gap: 0.75rem;

            img {
                margin: 0;
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

export const ProfileSettingsBtn = styled(Link)`
    display: inline-block;
    padding: 0.375rem 0.5rem;
    border-radius: 0.25rem;
    color: var(--primary-dark);
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
