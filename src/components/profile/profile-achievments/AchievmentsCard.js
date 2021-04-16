import React, {useContext, useEffect, useState} from 'react'
import {AchievmentsCardWrapper} from './ProfileAchievmentsElements'
import { FirebaseContext } from '../../firebase/context';

const AchievmentsCard = ({icon, name, desc, done, id, show}) => {
    const [checked, setChecked] = useState(false)
    const [showCard, setShowCard] = useState(false)
    const [ach, setAch] = useState(false)
    const userData = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext)
    const toast = document.querySelector(".toast");
    useEffect(() => {
        firebase.user(userData.uid).child(`/achievments/${id}`).on('value', (snapshot) => {
            const data = snapshot.val()
            setShowCard(data)
            if(data.show === true) {
                setChecked(true)
            }
        })
        console.log(name)

        firebase.user(userData.uid).child('/achievments').on('value', (snapshot) => {
            const data = snapshot.val()
            let list = []
            console.log(data)
            for(const key in data) {
                list.push(data[key])
            }
            setAch(list)
        })
    }, [checked])
    const onChangeFunc = (arr, id) => {
        let showAch = checked;
        disableAchs(arr)
        setChecked(!checked)

        firebase.user(userData.uid).child(`/achievments/${id}`).update({
            show: !checked
        })
    }


    const disableAchs = (arr) => {
        arr.forEach((item) => {
            firebase.user(userData.uid).child(`/achievments/${item.id}`).update({
                show: false
            })
        })
    }

    return (
        <>
            <AchievmentsCardWrapper done={done}>
                {/* <img>{icon}</img> */}
                <span>{name}</span>
                <span>{desc}</span>
                <input type="checkbox" checked={showCard.show} onClick={() => onChangeFunc(ach, id)}/>

            </AchievmentsCardWrapper>
        </>
    )
}

export default AchievmentsCard
