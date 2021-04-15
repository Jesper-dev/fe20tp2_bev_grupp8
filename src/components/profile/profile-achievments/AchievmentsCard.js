import React, {useContext, useEffect, useState} from 'react'
import {AchievmentsCardWrapper} from './ProfileAchievmentsElements'
import { FirebaseContext } from '../../firebase/context';

const AchievmentsCard = ({icon, name, desc, done, id}) => {
    const [checked, setChecked] = useState(false)
    const [ach, setAch] = useState(false)
    const userData = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext)
    const toast = document.querySelector(".toast");
    useEffect(() => {
        firebase.user(userData.uid).child(`/achievments/${id}`).once('value', (snapshot) => {
            const data = snapshot.val()
            if(data.show === true) {
                setChecked(true)
            }
        })
        firebase.user(userData.uid).child('/achievments').on('value', (snapshot) => {
            const data = snapshot.val()
            setAch(data)
        })
    }, [])
    const onChangeFunc = () => {
        let res = false;
        res = checkIfShowed(id)
        if(res === true) return;

        setChecked(!checked)

        firebase.user(userData.uid).child(`/achievments/${id}`).update({
            show: !checked
        })
    }

    const checkIfShowed = (id) => {
        console.log(id)
        if(id === "bitcoin") {
            if(ach.millionaire.show === true) {
                setChecked(false)
                toast.style.transform = 'scale(1)';
            setTimeout(() => {
                toast.style.transform = 'scale(0)';
            }, 2500);
                return true;
            }
        } else if(id === "millionaire") {
            if(ach.bitcoin.show === true) {
                setChecked(false)
                toast.style.transform = 'scale(1)';
            setTimeout(() => {
                toast.style.transform = 'scale(0)';
            }, 2500);
                return true;
            }
        }
    }
    return (
        <>
            <AchievmentsCardWrapper done={done}>
                {/* <img>{icon}</img> */}
                <span>{name}</span>
                <span>{desc}</span>
                <input type="checkbox"  checked={checked} onChange={() => onChangeFunc()}/>

            </AchievmentsCardWrapper>
            <p className="toast" style={{ transform: 'scale(0)' }}>
                You can only have on selected!
            </p>
        </>
    )
}

export default AchievmentsCard
