import styled from 'styled-components';

export const ContentWrapper = styled.div`
    width: 100%;
    max-width: 40rem;

    form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin: 0;
    }

    textarea {
        padding: 0.75rem;
        border: 0.125rem solid #ddd;
        border-radius: 0.25rem;
        outline: none;
        background: none;
        font: inherit;
        resize: none;
        height: 4rem;
        transition: height 250ms ease-in-out;

        &::placeholder {
            color: var(--primary);
            opacity: 1;
        }

		&:focus, &.not-empty {
			height: 12rem;
		}
    }

    button {
        padding: 0.75rem;
        border: none;
        border-radius: 0.25rem;
        margin: 0;
        background-color: var(--primary);
        color: white;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
    }
`;
