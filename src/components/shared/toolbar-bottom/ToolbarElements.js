import styled from 'styled-components';

export const ToolbarElement = styled.nav`
    position: fixed;
    bottom: 0;

    width: 100%;
    height: 3.5rem;
    background-color: var(--primary);

    ul {
        display: grid;
        grid-auto-flow: column;
        padding: 0;
        margin: 0;
        height: 100%;
        list-style-type: none;
    }

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        height: 100%;
        color: var(--body);
        text-decoration: none;

        &:hover {
            background-color: var(--primary-dark);
        }
    }

    .active {
        background-color: var(--primary-dark);
    }
`;
