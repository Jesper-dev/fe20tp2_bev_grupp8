import styled from 'styled-components';

export const ContentWrapper = styled.section`
    margin: auto;
    width: 100%;
    max-width: 40rem;
    text-align: center;


    & > div {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        max-height: 30vh;
        overflow: auto;
        scrollbar-width: thin;

        &::-webkit-scrollbar {
            width: 10px;
        }
    }

/*
    ::-webkit-scrollbar — the entire scrollbar.
    ::-webkit-scrollbar-button — the buttons on the scrollbar (arrows pointing upwards and downwards).
    ::-webkit-scrollbar-thumb — the draggable scrolling handle.
    ::-webkit-scrollbar-track — the track (progress bar) of the scrollbar.
    ::-webkit-scrollbar-track-piece — the part of the track (progress bar) not covered by the handle.
    ::-webkit-scrollbar-corner — the bottom corner of the scrollbar, where both horizontal and vertical scrollbars meet.
    ::-webkit-resizer — the draggable resizing handle that appears at the bottom corner of some elements.
*/
    h1 {
        margin: 2rem 0 0.75rem 0;
    }
`;
