import styled from 'styled-components';

export const MainWrapper = styled.main`
    display: flex;

    & > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        & > section {
            width: 75%;
            margin-top: 16px;
        }
    }
`;
