import styled from 'styled-components';

export const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;

	.primary{
		color: black;
	}

	.delete-account-btn {
		padding: 0.75rem 1rem;
		border: 0.125rem solid red;
		border-radius: 0.25rem;
		background: none;
		color: red;
		font-family: inherit;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 125ms linear, color 75ms linear;

		&:hover {
			background-color: red;
			color: white;
		}
	}
`;
