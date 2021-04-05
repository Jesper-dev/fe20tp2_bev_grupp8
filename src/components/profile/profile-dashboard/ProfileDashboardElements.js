import styled from 'styled-components';

export const Wrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 2rem;

    .quick-cards-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        h1 {
            margin: 0;
            color: #a8a8a8;
            font-size: 0.75rem;
            text-transform: uppercase;
            white-space: nowrap;
        }

        h2 {
            margin: 0.1875rem 0 0 0;
            color: #383838;
            white-space: nowrap;
        }
    }

    @media screen and (max-width: 640px) {
        padding: 1rem 0;
    }

    article {
        padding: 1rem;
        border-radius: 0.25rem;
        box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.04),
            1px 1px 1px rgba(0, 0, 0, 0.04);
        background-color: white;
    }
`;
