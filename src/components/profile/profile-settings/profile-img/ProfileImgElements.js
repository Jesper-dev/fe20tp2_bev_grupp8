import styled from 'styled-components';

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        width: 200px;
        margin: 0;
    }

    button {
        border: none;
        border-radius: 0.2rem;
        width: 155px;
           padding: 8px;
        background: var(--secondary);
        color: var(--body);
    }

    input[type="file"] {
    display: none;
}

.custom-file-upload {
    color: var(--secondary);
    border: 1px solid var(--secondary);
    border-radius: 0.25rem;
    display: inline-block;
    text-align: center;
    padding: 8px;
    width: 155px;
    cursor: pointer;
}

.svg-avatar {
      margin: 15px auto;
      width: 150px;
      height: 150px;
     /*  border: 3px solid var(--secondary); */
      fill: salmon;
      border-radius: 50%;
}

`;

export const ProfileImgElement = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 8px;
    border: 3px solid var(--primary);
`;

export const ProfileSettingsImg = styled.img`
      margin: 15px auto;
      width: 150px;
      height: 150px;
      border-radius: 50%;
`;

export const CropperWrapper = styled.div`
   /*  margin: 0 auto; */
    width: 230px;
    height: 230px;
    overflow: hidden;
    position: relative;
`;
