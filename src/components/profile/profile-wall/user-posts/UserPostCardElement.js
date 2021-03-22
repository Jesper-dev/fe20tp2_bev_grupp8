import styled from "styled-components";

const UserPostCardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	margin-top: 2rem;
	background-color: var(--body);
	padding: 1rem;
	border-radius: 0.25rem;

	.username {
		color: #383838;
		font-size: 1.25rem;
		font-weight: 600;
	}

	.content {

	}

	.date {
		color: darkgrey;
		font-size: 0.875rem;
	}

	button {
		align-self: flex-start;
		background: none;
		border: none;
		border-radius: 0.25rem;
		padding: 0.375rem;
		cursor: pointer;
		transition: background-color 125ms linear;

		.likes {
			margin-left: 0.5rem;
		}

		&:hover {
			background-color: #eee;
		}
	}
`

export default UserPostCardWrapper;