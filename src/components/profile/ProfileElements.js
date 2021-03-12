import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ContentWrapper = styled.div`

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* padding: 0 1rem; */
    }

    .profile-avatar-svg {
        height: 70px;
        width: 70px;
        fill: salmon;
    }

    p {
        font-size: 0.8rem;

    }
`;

export const ProfileSettingsBtn = styled(Link)`
    font-size: 0.9rem;
    color: var(--primary-dark);
    text-decoration: none;
`;

export const BtnsWrapper = styled.div`
    width: 150px;
    display: flex;
    flex-direction: column;
`;
