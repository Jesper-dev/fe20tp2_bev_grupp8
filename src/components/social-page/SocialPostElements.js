import styled from 'styled-components';

export const ContentWrapper = styled.div`
    width: 100%;
    max-width: 40rem;

    form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin: 1rem 0 0 0;
    }

    textarea {
        padding: 0.75rem;
        border: 0.1rem solid #ddd;
        border-radius: 0.25rem;
        outline: none;
        background: none;
        font: inherit;
        resize: none;
        height: 4rem;
        transition: height 250ms ease-in-out;

        &::placeholder {
            color: grey;
            opacity: 1;
        }

		&:focus, &.not-empty {
			height: 12rem;
			border-color: var(--clr-primary__brighter);
			box-shadow: 0 0 0 0.1875rem var(--clr-primary-light__dimmer);
		}
    }

    button {
        padding: 0.75rem;
        border: none;
        border-radius: 0.25rem;
        margin: 0;
        background-color: var(--clr-primary);
        color: white;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
		transition: background-color 125ms linear;

		&:hover, &:active {
			background-color: var(--clr-primary__brighter);
		}
    }

    div {
        display: flex;
        align-items: center;
    }

	.toast {
		position: absolute;
		right: 0;
		left: 0;
		bottom: 5rem;
		border-radius: 0.25rem;
		box-shadow: var(--box-shadow-cards);
		margin: auto;
		width: 15rem;
		height: 2.75rem;
		line-height: 2.75rem;
		background-color: var(--clr-primary);
		color: var(--clr-almost-white);
		font-weight: 500;
		text-align: center;
		transition: transform 150ms linear;
	}
`;
