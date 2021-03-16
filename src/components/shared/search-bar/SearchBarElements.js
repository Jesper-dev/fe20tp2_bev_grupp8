import styled from 'styled-components'

export const ContentWrapper = styled.div`

    padding: 1rem;

    .form {
        position: relative;
		margin: 0;
    }

    .input {
        height: 2.25rem;
        width: 2.25rem;
        padding: 0;
        border: 0.09375rem solid #C8C8C8;
        border-radius: 0.25rem;
        outline: none;
        background: none;
        color: transparent;
        font-family: inherit;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1rem;
        text-indent: 0.375rem;
		transition: width 0.75s ease-in-out, border-color 0.5s ease-in-out, color 0.5s ease-in-out;

        &::placeholder {
            opacity: 0;
			/* transition: opacity 0.25s ease-in-out;  */
        }

		&::-webkit-input-placeholder {
			transition: opacity 0.25s ease-in-out; 
		}

		&::-webkit-search-cancel-button {
			display: none;
		}

		/* TODO: If focused && textContent !== null --> keep expanded */

        &:focus {
            width: 100%;
            padding-right: 2.25rem;
            border-color: var(--third);
			color: #383838;
        }

        &:focus::placeholder {
			opacity: 1;
            color: grey;
            font-weight: 300;
        }
    }

    .input ~ svg {
        position: absolute;
        top: 0.375rem;
        left: 0.375rem;
        fill: #C8C8C8;
        transition: left 0.75s ease-in-out, fill 0.75s ease-in-out;
        pointer-events: none;
    }

    .input:focus ~ svg {
        left: calc(100% - 1.875rem);
        fill: var(--third);
		/* pointer-events: auto; */
		/* cursor: pointer; */
    }
`