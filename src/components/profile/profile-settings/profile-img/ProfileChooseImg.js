import React, { useState, useEffect, useCallback } from 'react';

import {
    ContentWrapper,
    ProfileImgElement,
    ImgWrapper,
    CropWrapper,
    CropperWrapper
} from './ProfileImgElements';

import ImageCropper from './ProfileImgCropper'

const ProfileChooseImg = () => {
    const [blob, setBlob] = useState(null)
    const [inputImg, setInputImg] = useState('')

      const [initialCroppedAreaPixels, setInitialCroppedAreaPixels] = useState(
    undefined
  )

      useEffect(() => {
    const croppedAreaPixels = JSON.parse(
      window.localStorage.getItem('croppedAreaPixels')
    )
    setInitialCroppedAreaPixels(croppedAreaPixels)
  }, [])


    const getBlob = (blob) => {
        // pass blob up from the ImageCropper component
        setBlob(blob)
    }

    const onInputChange = (e) => {
        // convert image file to base64 string
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            setInputImg(reader.result)
        }, false)

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const handleSubmitImage = (e) => {
    // upload blob to firebase 'images' folder with filename 'image'
        e.preventDefault()
        console.log(inputImg)
        // firebase
        //     .storage()
        //     .ref('images')
        //     .child('image')
        //     .put(blob, { contentType: blob.type })
        //     .then(() => {
        //         // redirect user
        //     })

    window.localStorage.setItem(
      'croppedAreaPixels',
      JSON.stringify(blob)
    )
    }


    return (
        <>
            <ContentWrapper>
    {/*             <input
                    type="file"
                    accept="image/*"
                    multiple="false"
                    onChange={handleImageUpload}
                />
                <ImgWrapper>
                    <img
                        className="uploaded-img"
                        src={img}
                        ref={uploadedImage}
                    />
                </ImgWrapper> */}


                      <form onSubmit={handleSubmitImage}>
            <input
                type='file'
                accept='image/*'
                onChange={onInputChange}
            />
            {
                inputImg && (
                    <CropperWrapper>
                    <ImageCropper
                        getBlob={getBlob}
                        inputImg={inputImg}
                    />
                    </CropperWrapper>
                )
            }
            <button type='submit'>Submit</button>
        </form>
            </ContentWrapper>
        </>
    );
};

export default ProfileChooseImg;
