import styled from 'styled-components';

const FeaturedEmployeeWrapper = styled.article`
    flex: 1;

    img {
        width: 55px;
    }

    & > div {
        display: flex;
        justify-content: space-between;

        & > div {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            h4 {
                margin: 0.5rem 0;
            }

            p > span {
                color: var(--lighter-green);
                font-weight: 600;
            }

            .fa-crown {
                margin-left: 0.5rem;
                color: gold;
            }

            a {
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                color: var(--primary);
                font-weight: 500;
                text-decoration: none;

                &:hover {
                    background-color: #e8e8e8;
                }
            }
        }
    }
`;

export default FeaturedEmployeeWrapper;
