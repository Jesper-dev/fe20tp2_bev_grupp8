import styled from 'styled-components';

export const ToolbarElement = styled.nav`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3.5rem;
    background-color: var(--clr-primary);

    ul {
        display: grid;
        grid-auto-flow: column;
        padding: 0;
        margin: 0;
        height: 100%;
        list-style-type: none;
    }

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        height: 100%;
        color: var(--clr-almost-white);
		font-size: 0.875rem;
        text-decoration: none;

		.fas {
			font-size: 1.125rem;
		}

        &:hover {
            background-color: var(--clr-primary__brighter);
        }
    }

    .active {
        background-color: var(--clr-primary__dimmer);

		&:hover {
			background-color: var(--clr-primary__dimmer);
		}
    }

    @media screen and (min-width: 1026px) {
        display: none;
  
    }
`;
