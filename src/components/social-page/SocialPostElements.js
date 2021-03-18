import styled from 'styled-components';

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    //flex-basis: auto;
    //flex-shrink: 0;
    border: 1px solid black;
    margin: 8px;

    textarea[type='text'] {
        box-sizing: border-box;
        display: block;
        font: inherit;
        font-size: 1rem;
        outline: none;
        resize: none;
        border: none;
        margin: 8px;
        //padding: 6px;
        width: auto;
        height: 1.5rem;
        //display: flex;
        //flex-wrap: wrap;
        background-color: var(--body-secondary);

        &::placeholder {
            color: var(--primary);
            font-size: 1.2rem;
            opacity: 1;
        }
    }

    p {
        font-size: 1.6rem;
    }

    h2 {
        text-align: center;
        font-size: 1.2rem;
        color: var(--primary);
    }

    img {
        width: 100px;
        height: 100px;
    }

    button {
        //display: flex;
        margin-left: auto;
        //justify-content: flex-end;
        padding: 12px;
        background-color: var(--primary);
        border: none;
        border-radius: 5px;
        margin: 8px;
    }

    textarea:focus {
        //fixit later need to expand it when focus
        height: 8rem;
        witdh: 8rem;

        button {
            //display: flex;
            margin-left: auto;
            //justify-content: flex-end;
            padding: 12px;
            background-color: var(--primary);
            border: none;
            border-radius: 5px;
            margin: 8px;
        }
    }
`;
