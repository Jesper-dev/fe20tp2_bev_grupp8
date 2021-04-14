import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    h2 {
        font-size: 1.25rem;
        margin: 0 0 0.25rem 0;
    }
    .quick-cards-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        h2 {
            margin: 0;
            color: #a8a8a8;
            font-size: 0.75rem;
            text-transform: uppercase;
            white-space: nowrap;
        }
        h3 {
            margin: 0.25rem 0 0 0;
            color: #383838;
            white-space: nowrap;
        }
    }
    article {
        padding: 1rem;
        border-radius: 0.25rem;
        /*     box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.04),
            1px 1px 1px rgba(0, 0, 0, 0.04); */
        box-shadow: var(--box-shadow-cards);
        background-color: white;
    }
`;

export const SectionWrapper = styled.section`
    margin: auto;
    width: 100%;
    & > h1 {
        font-size: 1.25rem;
        cursor: pointer;
        & > span {
            vertical-align: middle;
            color: grey;
        }
    }

    .flex-wrapper{
        margin: 2rem 0 1.25rem 0;
        display: flex;
        justify-content: space-between;
    }
`;

export const JoinTodayWrapper = styled.section`
    margin-top: 35px;
    text-align: center;
    cursor: pointer;
`;
