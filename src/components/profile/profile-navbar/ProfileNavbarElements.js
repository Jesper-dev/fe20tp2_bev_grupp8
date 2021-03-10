import styled from 'styled-components'


export const ProfileNavbarElement = styled.nav`
    height: 24px;
    background-color: var(--primary);

	ul {
        color: var(--body);
        display: grid;
        grid-auto-flow: column;
        padding: 0;
        margin: 0;
        height: 100%;
        list-style-type: none;
	}

	a {
	display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--body);
        text-decoration: none;

	}

	    .active {
        background-color: var(--primary-dark);
        color: white;
	}
`