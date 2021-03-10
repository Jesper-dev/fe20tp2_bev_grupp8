import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const ContentWrapper = styled.div`
 div {
	 display: flex;
	 align-items: center;
	 justify-content: space-between;
	 padding: 0 1rem;
 }

    .profile-avatar-svg{
        height: 70px;
        width: 70px;
		fill: green;
    }
`

export const ProfileSettingsBtn = styled(Link)`
    color: var(--primary-dark);
    text-decoration: none;
`