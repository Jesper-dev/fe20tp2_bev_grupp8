import styled from 'styled-components';

export const ChatCardWrapper = styled.article`
    display: flex;
    /* flex-direction: ${(props) => (props.yourMsg ? 'row-reverse' : 'row')}; */
    flex-direction: row;
    /*     flex-wrap: wrap-reverse; */
    align-items: center;
    justify-content: ${(props) => (props.yourMsg ? 'flex-end' : 'flex-start')};
    padding: 8px;
    gap: 0.25rem;
    /*     width: 90%; */

    img {
        width: 35px;
        /*        border: 1px solid black; */
        border-radius: 50%;
    }

    span {
        font-size: 0.8rem;
        background: ${(props) =>
            props.yourMsg ? 'var(--clr-primary-light__dimmer)' : '#f0f2f5'};
        /* background: var(--clr-primary-light); */
        /* background: #f0f2f5; */
        padding: 0.5rem;
        border-radius: 20px;
    }
`;
