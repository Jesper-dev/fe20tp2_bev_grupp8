import styled from 'styled-components'

export const SearchBarElement = styled.form`
    position: relative;
    display: flex;
    justify-content: flex-end;
    margin: 0;
    width: 100%;
    max-width: 40rem;

    input {
        padding: 0;
        border: 0.1rem solid #C8C8C8;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 0.25rem;
        outline: none;
        background: none;
        color: transparent;
        font-family: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1rem;
        text-indent: 0.375rem;
        cursor: pointer;
		transition: width 0.5s ease-in-out,
                    border-color 0.25s ease-in-out,
                    box-shadow 0.25s ease-in-out,
                    color 0.25s ease-in-out;

        &::placeholder {
            opacity: 0;
        }

		&::-webkit-input-placeholder {
			transition: opacity 0.25s linear;
		}

		&::-webkit-search-cancel-button {
			//display: none;
		}

        &:focus, &.not-empty {
            width: 100%;
            padding-right: 2.25rem;
            /* border-color: #8CC4E0; */
            border-color: var(--clr-primary__brighter);
            /* box-shadow: 0 0 0 0.1875rem #DDEAFD; */
            box-shadow: 0 0 0 0.1875rem var(--clr-primary-light__dimmer);
			color: #383838;
            cursor: unset;
        }

        &.not-empty {
            & + button > svg {
                fill: var(--clr-primary);
            }
        }

        &:focus::placeholder {
			opacity: 1;
            color: grey;
            font-weight: 400;
        }
    }

    button {
        position: absolute;
        padding: 0;
        border: none;
        width: 2.25rem;
        height: 2.25rem;
        background: none;
        pointer-events: none;

        & > svg {
            fill: lightgrey;
            transition: fill 125ms ease-in-out;
        }
    }
`