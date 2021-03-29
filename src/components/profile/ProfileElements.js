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
        width: 100%;
        max-width: 40rem;
    }

    .profile-avatar-svg {
        height: 70px;
        width: 70px;
        fill: salmon;
    }

    p {
        font-size: 1.1rem;
    }
`;

export const ProfileSettingsBtn = styled(Link)`
    font-size: 1.1rem;
    color: var(--primary-dark);
    text-decoration: none;
`;

export const BtnsWrapper = styled.div`
    /* height: 65px; */
    width: 150px;
    display: flex;
    flex-direction: column;
`;
