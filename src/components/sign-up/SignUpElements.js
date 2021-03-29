import styled from 'styled-components';

export const ContentWrapper = styled.div`
    .side-by-side {
        flex-direction: row;
        justify-content: space-between;
    }

    .logo-lets {
        margin-top: 25px;
        width: 550px;

        @media screen and (max-width: 768px){
            width: 450px;
            height: 120px;
        }
        @media screen and (max-width: 460px){
            width: 280px;
            min-height: 65px;
        }

    }

    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 0.5rem;

    h1 {
        color: var(--primary);
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: 100%;
        max-width: 24rem;

        label {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            color: #383838;
            font-family: inherit;
            font-size: 0.8125rem;
            font-weight: 600;

            input {
                padding: 0.5rem 0.375rem 0.5rem 0;
                border: 0.09375rem solid #c8c8c8;
                border-radius: 0.25rem;
                outline: none;
                background: none;
                color: #383838;
                font-family: inherit;
                font-size: 0.8125rem;
                font-weight: 500;
                text-indent: 0.375rem;
                transition: border-color 125ms linear, box-shadow 125ms linear;

                &:hover {
                    border-color: var(--third);
                }

                &:focus {
                    border-color: var(--third);
                    box-shadow: 0 0 0 0.1875rem #ddeafd;
                }

                &:invalid {
                    border-color: #e68e8e;
                    box-shadow: 0 0 0 0.1875rem #fddddd;
                }

                &:invalid:not(:focus) {
                    border-color: #e68e8e;
                    box-shadow: none;
                }
            }
        }

        button {
            padding: 0.5rem 0.75rem;
            border: none;
            border-radius: 0.25rem;
            outline: none;
            background-color: var(--primary);
            color: var(--body);
            font-family: inherit;
            font-size: 0.8125rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 125ms linear, box-shadow 125ms linear;

            &:hover {
                background-color: var(--primary-dark);
            }

            &:focus {
                box-shadow: 0 0 0 0.1875rem var(--third);
            }

            &:disabled {
                background-color: grey;
                cursor: initial;
            }
        }

        p {
            font-size: 0.8125rem;
            font-weight: 500;
            text-align: center;

            a {
                padding: 0.1875rem;
                border-radius: 0.25rem;
                outline: none;
                color: var(--primary);
                text-decoration: none;
                transition: box-shadow 125ms linear;

                &:hover {
                    text-decoration: underline;
                }

                &:focus {
                    box-shadow: 0 0 0 0.1875rem var(--third);
                }
            }
        }

        .error-message {
            padding: 0.625rem;
            border-left: 0.1875rem solid coral;
            /* border-radius: 0.25rem; */
            background-color: #ffd3c4;
            font-weight: 500;
        }
    }
`;
