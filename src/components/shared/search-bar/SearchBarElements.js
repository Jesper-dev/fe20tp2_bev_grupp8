import styled from 'styled-components'

export const ContentWrapper = styled.div`
    width: 100%;
    max-width: 40rem;
    margin-bottom: 1rem;

    .form {
        position: relative;
		margin: 0;
        display: flex;
        justify-content: flex-end;
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

		/* TODO:
            fix search btn, you know focus/unfocus button action :)
        */

        &:focus, &.not-empty {
            width: 100%;
            padding-right: 2.25rem;
            border-color: var(--secondary);
			color: #383838;
        }

        &:focus::placeholder {
			opacity: 1;
            color: grey;
            font-weight: 300;
        }

        &:focus ~ button {
            /* pointer-events: auto; */
        }
    }

    .input ~ button {
        position: absolute;
        padding: 0;
        border: none;
        width: 2.25rem;
        height: 2.25rem;
        background: none;
        pointer-events: none;

        & > svg {
            fill: lightgrey;
        }

        &:focus > svg {
            fill: var(--secondary);
        }
    }
`