import React, { useState, useContext, useEffect } from 'react';
import { HslColorPicker } from 'react-colorful';

import { FirebaseContext } from '../../../../firebase';
import { Wrapper } from './ChangeColorElements';
import {
    fetchUsersOrgSnapshotArray,
    fetchOrgSnapshot,
} from '../../../../shared/functions/firebase-functions';

const ChangeColor = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const [primaryColor, setPrimaryColor] = useState({ h: 0, s: 0, l: 32 });

    useEffect(() => {
        fetchOrgSnapshot(
            firebase,
            user.organization,
            '/colors/primaryColor',
            setPrimaryColor
        );
    }, []);

    const updateColor = (primaryColor) => {
        firebase
            .organization(user.organization)
            .child('/colors/primaryColor')
            .update({
                h: primaryColor.h,
                s: primaryColor.s,
                l: primaryColor.l,
            });

        setPrimaryColor(primaryColor);
        console.log(primaryColor);
    };

    // TODO: Explore "react-colorful" features, update "color-preview" live

    return (
        <Wrapper>
            <HslColorPicker color={primaryColor} onChange={setPrimaryColor} />
            <div className="container">
                <div
                    className="color-preview"
                    style={{ backgroundColor: primaryColor }}
                ></div>
                <button onClick={() => updateColor(primaryColor)}>
                    Confirm
                </button>
            </div>
        </Wrapper>
    );
};

export default ChangeColor;
