import styled from 'styled-components'


export const ToolbarElement = styled.nav`
    position: fixed;
    bottom: 0;

    width: 100%;
    height: 10vh;
	overflow-x: auto;

	background-color: blueviolet;

	ul {
		margin: 0;
		padding: 0;

		height: 100%;
		width: 100%;

        list-style: none;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	a {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--white);
        text-decoration: none;
	}

`
