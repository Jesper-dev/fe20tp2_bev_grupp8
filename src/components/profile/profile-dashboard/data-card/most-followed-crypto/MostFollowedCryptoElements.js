import styled from 'styled-components';

export const ContentWrapper = styled.div`
    text-align: center;
    /*     margin: 56px 0 56px 0; */
    padding: 24px;
    border-radius: 0.5rem;
    /*     background: var(--body);
    box-shadow: var(--box-shadow-cards); */
    /*     transition: all 0.4s ease-in-out; */

    div {
        height: 70%;
    }
    button {
        padding: 8px 16px;
        background: none;
        border-radius: 3px;
        border: 1px solid var(--lighter-red);
        color: var(--lighter-red);
        font-size: 1.1rem;
        outline: none;
        cursor: pointer;
    }
`;
