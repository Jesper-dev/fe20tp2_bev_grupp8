import styled from 'styled-components';

export const PortOverviewWrapper = styled.details`
    box-shadow: var(--box-shadow-cards);
    background-color: white;

    & > summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0 1rem 1rem;
        border-radius: 0.25rem;
        outline: none;
        cursor: pointer;


        h1 {
            font-size: 1.3rem;
            color: #383838;

            .fa-wallet {
                color: var(--clr-primary);
                margin-right: 0.1875rem;
            }
        }

        & > div {
            display: flex;

            & > article {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.25rem;
                padding: 0.5rem 1.375rem;

                &:not(:last-child) {
                    border-right: 1.5px solid #e8e8e8;
                }

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

    /* padding: 0rem 1rem 0rem 1rem; */
    /*    box-shadow: var(--box-shadow-cards);
    background-color: var(--body); */
/*     box-sizing: border-box;
    width: 100%;
    max-width: 40rem;
    margin: 0 auto 0 auto; */
    /*
    transition: height 1s ease-in-out; */

/*     i {
        cursor: pointer;
    }

    h2 {
        display: inline-block;
        margin: 0;
        color: #383838;
        font-size: 1.25rem;
        font-weight: 600;
    }

    & > header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: var(--box-shadow-cards);
        background-color: var(--body);
        padding: 1rem;
        border-radius: 0.25rem;


        .percent {
            margin-left: 0.5rem;
            font-size: 1rem;
        }

        .total {
            color: #383838;
            display: flex;
            font-weight: 500;
        }

        .fa-wallet {
            color: var(--clr-primary);
            margin-right: 0.25rem;
        }
    } */
`;

/* export const PortfolioTopbarWrapper = styled.article`
       background-color: var(--body);
    padding: 1rem 1rem 0.5rem 1rem;
    border-radius: 0.25rem;
       box-shadow: var(--box-shadow-cards);

    box-sizing: border-box;
    width: 100%;
    max-width: 40rem;
    margin: 0rem auto 0 auto;
    display: flex;
    gap: 0.5rem;

    .quick-cards-wrapper {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        width: 100%;
        gap: 0.5rem;
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
    article {
        padding: 1rem;
        border-radius: 0.25rem;
        box-shadow: var(--box-shadow-cards);
        background-color: white;
    }

    & > article {
        flex: 1;
    }

    @media screen and (max-width: 640px) {
        flex-wrap: wrap;
    }
`;
 */