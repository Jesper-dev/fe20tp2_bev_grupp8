import React, {useContext, useEffect, useState} from 'react'
import {AchievmentsCardWrapper} from './ProfileAchievmentsElements'
import { FirebaseContext } from '../../firebase/context';

const AchievmentsCard = ({icon, name, desc, done, id}) => {
    const [checked, setChecked] = useState(false)
    const userData = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext)
    const onChangeFunc = () => {
        setChecked(!checked)
        firebase.user(userData.uid).child(`/achievments/${id}`).update({
            show: !checked
        })
    }
    return (
        <>
            <AchievmentsCardWrapper done={done}>
                {/* <img>{icon}</img> */}
                <span>{name}</span>
                <span>{desc}</span>
                <input type="checkbox" checked={checked} onChange={() => onChangeFunc()}/>
            </AchievmentsCardWrapper>
        </>
    )
}

export default AchievmentsCard
