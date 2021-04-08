// ImageCropper.js

import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './LogoSave';

import { useDispatch } from 'react-redux';
import { setOrgLogo } from '../../../../../redux/actions';

const LogoImgCropper = ({ getBlob, inputImg }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const dispatch = useDispatch()

    /* onCropComplete() will occur each time the user modifies the cropped area,
    which isn't ideal. A better implementation would be getting the blob
    only when the user hits the submit button, but this works for now  */
    const onCropComplete = async (_, croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(inputImg, croppedAreaPixels);

        dispatch(setOrgLogo(croppedImage))

    /*     getBlob(croppedImage); */
    };

    return (
        /* need to have a parent with `position: relative`
    to prevent cropper taking up whole page */
        <div className="cropper">
            <Cropper
                image={inputImg}
                crop={crop}
                zoom={zoom}
                aspect={4/2}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
            />
        </div>
    );
};

export default LogoImgCropper;
