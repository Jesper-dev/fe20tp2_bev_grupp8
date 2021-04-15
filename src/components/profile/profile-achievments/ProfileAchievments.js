import React, {useContext, useEffect, useState} from 'react'
import {ContentWrapper} from './ProfileAchievmentsElements'
import { FirebaseContext } from '../../firebase/context';
import AchievmentsCard from './AchievmentsCard'

const ProfileAchievments = () => {
    const userData = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext)
    const [achData, setAchData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        firebase.user(userData.uid).child('/achievments').once('value', (snapshot) => {
            const data = snapshot.val()
            if(!data) return;
            let list = []
            for(const key in data) {
                list.push(data[key])
            }
            setAchData(list)
            setLoading(false)
        })
    }, [loading])

    console.log(achData)
    return (
        <ContentWrapper>
            <h1>Achievments</h1>
            {loading  ? 'loading...' : <div className="achievments-wrapper">
                {achData ? achData.map((item, index) => {
                    return <AchievmentsCard key={index} name={item.name} desc={item.desc} done={item.done} id={item.id}/>
                }) : ''}

            </div>}

        </ContentWrapper>
    )
}

export default ProfileAchievments
