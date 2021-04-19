import styled from 'styled-components';

export const PortOverviewWrapper = styled.details`

    @media screen and (max-width: 768px) {
        h1 {
            flex: 1;
        }

        div {
            width: 100%;
        }
    }

    box-shadow: var(--box-shadow-cards);
    background-color: white;
    border-radius: 0.25rem;
    width: 100%;
    margin: 1.5rem auto 0 auto;

    &[open] > summary > h1 > .fa-chevron-right {
        transform: rotate(90deg);
    }

    & > summary {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        padding: 0.75rem;
        outline: none;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;

        &::marker, &::-webkit-details-marker {
            display: none;
        }

        h1 {
            /* flex: 1; */
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            font-size: 1.3rem;
            color: #383838;

            .fa-chevron-right {
                font-size: 0.925rem;
                transition: transform 150ms linear;
            }
        }

        & > div {
            /* width: 100%; */
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem 0.5rem;
            justify-content: center;
            align-items: center;

            & > article {
                flex: 1;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.1875rem;
                padding: 0.875rem 1.375rem;
                border-radius: 0.25rem;
                /* background-color: var(--clr-almost-white); */

                h2 {
                    margin: 0;
                    color: #a8a8a8;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    white-space: nowrap;
                }

                h3 {
                    font-size: 1.1rem;
                    margin: 0.25rem 0 0 0;
                    color: #383838;
                    white-space: nowrap;
                }
            }
        }
    }
`