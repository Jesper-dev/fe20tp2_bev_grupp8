import styled from 'styled-components'

const TabBarElement = styled.nav`
    border-radius: 0.375rem;
	margin: auto;
    width: 100%;
    max-width: 24rem;
    height: 2.5rem;
    background-color: var(--clr-primary-light);

    & > ul {
        display: grid;
        grid-auto-flow: column;
        padding: 0;
        margin: 0;
        height: 100%;
        list-style-type: none;

        & > li {
            padding: 0.25rem;

			& > a {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.25rem;
				border-radius: 0.375rem;
				height: 100%;
				color: var(--clr-almost-black);
				font-size: 0.75rem;
				font-weight: 500;
				text-decoration: none;
				user-select: none;
				transition: background-color 125ms linear, color 125ms linear;

				&:hover, &:active {
					background-color: var(--clr-primary-light__dimmer);
				}

				&.active {
					background-color: var(--clr-primary);
    				color: var(--clr-almost-white);

					&:hover, &:active {
						background-color: var(--clr-primary__brighter);
					}
				}
        	}
        }
    }
`;

export default TabBarElement;