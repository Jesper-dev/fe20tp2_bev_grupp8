import styled from 'styled-components';

const ContentWrapper = styled.div`
    background-color: var(--body);
    width: 80%;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 1px 1px 3px 1px rgb(0 0 0 / 25%);

	h1 {
        font-size: 1.2rem;
        color: var(--body-fifth);
    }

    p {
        margin: 0.5rem 0;
    }

    a {
        text-decoration: none;
    }
`;

export default ContentWrapper;
