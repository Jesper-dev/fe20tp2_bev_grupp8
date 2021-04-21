import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 2rem 4rem;
	margin-bottom: 1rem;

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2rem 1rem;
		align-items: center;

		.color-preview {
			border: 0.1875rem solid var(--clr-primary__dimmer);
			border-radius: 50%;
			width: 5rem;
			height: 5rem;
			background: var(--clr-primary);
		}

		button {
			padding: 0.75rem 1rem;
			border: none;
			border-radius: 0.25rem;
			background-color: var(--clr-primary);
			color: var(--clr-almost-white);
			font-family: inherit;
			font-size: 0.875rem;
			font-weight: 500;
			cursor: pointer;
			transition: background-color 125ms linear;

			&:hover, &:active {
				background-color: var(--clr-primary__brighter);
			}
    	}
	}
`;
