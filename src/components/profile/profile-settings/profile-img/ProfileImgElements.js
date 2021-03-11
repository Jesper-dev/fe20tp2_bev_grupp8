import styled from 'styled-components';

export const ContentWrapper = styled.div`
    button{
        z-index: 99;
    }
    .uploaded-img {
        width: auto;
        height: 100%;
    }
`;

export const ProfileImgElement = styled.img`
    width: 70px;
    height: 70px;
`;

export const ImgWrapper = styled.div`
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 2px solid var(--primary);
    border-radius: 50%;
`;

export const CropperWrapper = styled.div`
    width: auto;
    height: 800px;
    position: relative
`