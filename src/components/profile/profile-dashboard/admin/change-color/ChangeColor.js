import React, { useState, useContext } from 'react'
import { HexColorPicker } from "react-colorful";
import { FirebaseContext } from '../../../../firebase';

import { GenericVestBtn } from '../../../../shared/button/ButtonElements';

const ChangeColor = () => {
    const [color, setColor] = useState("#aabbcc");
    const firebase = useContext(FirebaseContext)
    const user = JSON.parse(localStorage.getItem('authUser'));

    const changeColor = (color, value) => {
        if(value == "one") {
            firebase.organization(user.organization).child('/colors/colorOne').update({
                value: color
            })
        } else if(value == "two") {
            firebase.organization(user.organization).child('/colors/colorTwo/').update({
                value: color
            })
        } else if(value == "three") {
            firebase.organization(user.organization).child('/colors/colorThree/').update({
                value: color
            })
        }
    }
    return (
        <div>
           <HexColorPicker color={color} onChange={setColor} />
           <GenericVestBtn
                    onClick={() => changeColor(color, "one")}
                    pad="8px"
                    border="2px solid var(--primary)"
                    br="10px"
                    bg="none"
                    co="var(--primary)"
                >Submit Color One
                </GenericVestBtn>
                <GenericVestBtn
                    onClick={() => changeColor(color, "two")}
                    pad="8px"
                    border="2px solid var(--primary)"
                    br="10px"
                    bg="none"
                    co="var(--primary)"
                >Submit Color two
                </GenericVestBtn>
                <GenericVestBtn
                    onClick={() => changeColor(color, "three")}
                    pad="8px"
                    border="2px solid var(--primary)"
                    br="10px"
                    bg="none"
                    co="var(--primary)"
                >Submit Color three
                </GenericVestBtn>
        </div>
    )
}

export default ChangeColor
