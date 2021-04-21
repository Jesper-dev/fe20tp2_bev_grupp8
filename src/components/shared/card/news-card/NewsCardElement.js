import styled from 'styled-components';

const ContentWrapper = styled.article`
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: var(--box-shadow-cards);
    background-color: var(--body);

    h1 {
        margin: 0;
        font-size: 1.25rem;
    }

    p {
        margin: 0.5rem 0;
    }

    a {
        text-decoration: none;

        &:hover {
            text-decoration-line: underline;
        }
    }
`;

export default ContentWrapper;
