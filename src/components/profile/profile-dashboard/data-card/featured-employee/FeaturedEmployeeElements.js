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
        }
    }
`;

export default FeaturedEmployeeWrapper;
