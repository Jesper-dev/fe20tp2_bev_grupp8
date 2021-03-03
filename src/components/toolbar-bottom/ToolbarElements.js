import styled from 'styled-components'


export const ToolbarElement = styled.nav`
    position: sticky;
    bottom: 0;

    width: 100%;
    height: 8vh;

	ul {
		margin: 0;
		padding: 0;
        list-style: none;
		display: flex;
		justify-content: space-evenly;
	}

	a {
		color: red;
        text-decoration: none;
	}

`
