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
        let cont = checkIfTrue(arr, id)
        if(cont === true) return;

        disableAchs(arr)
        setChecked(!checked)

        firebase.user(userData.uid).child(`/achievments/${id}`).update({
            show: !checked
        })

        // toast.style.transform = 'scale(1)';
        // setTimeout(() => {
        //     toast.style.transform = 'scale(0)';
        // }, 2500);
    }

    const checkIfTrue = (arr, id) => {
        arr.forEach((item) => {
            if(item.id === id) {
                if(item.show === true) {
                    let cont = true;
                    return cont;
                }
            }
        })
    }

    const disableAchs = (arr) => {
        arr.forEach((item) => {
            firebase.user(userData.uid).child(`/achievments/${item.id}`).update({
                show: false
            })
        })
    }

    // const checkIfShowed = (id) => {
    //     console.log(id)
    //     if(id === "bitcoin") {
    //         if(ach.millionaire.show === true) {
    //             setChecked(false)
    //             toast.style.transform = 'scale(1)';
    //         setTimeout(() => {
    //             toast.style.transform = 'scale(0)';
    //         }, 2500);
    //             return true;
    //         }
    //     } else if(id === "millionaire") {
    //         if(ach.bitcoin.show === true) {
    //             setChecked(false)
    //             toast.style.transform = 'scale(1)';
    //         setTimeout(() => {
    //             toast.style.transform = 'scale(0)';
    //         }, 2500);
    //             return true;
    //         }
    //     }
    // }
    return (
        <>
            <AchievmentsCardWrapper done={done}>
                {/* <img>{icon}</img> */}
                <span>{name}</span>
                <span>{desc}</span>
                <input type="radio" id="radio" name="choose" checked={checked} onClick={() => onChangeFunc(ach, id)}/>

            </AchievmentsCardWrapper>
            <p className="toast" style={{ transform: 'scale(0)' }}>
                You selected to show {name} at your profile
            </p>
        </>
    )
}

export default AchievmentsCard
