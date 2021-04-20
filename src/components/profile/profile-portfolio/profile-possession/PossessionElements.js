import styled from 'styled-components';

export const ContentWrapper = styled.section`
    flex: 1;
    margin: 0 auto;
    text-align: center;


    & > div {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        max-height: 30vh;
      /*   overflow: auto;
        scrollbar-width: thin; */

        @media screen and (max-width: 550px) {
        max-height: 100vh;
    }

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
        margin: 1.5rem 0 1rem 0;
        white-space: nowrap;
    }
`;
