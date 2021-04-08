import React, {useContext, useEffect, useState} from 'react'
import { FirebaseContext } from '../../../firebase/context';

import { Wrapper } from './ProfileBioElements'
import { GenericVestBtn } from '../../../shared/button/ButtonElements'

const ProfileBio = () => {
    const [bio, setBio] = useState('')
    const [editable, setEditable] = useState(false)
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        firebase.user(user.uid).child('/bio').once('value', (snapshot) => {
            const data = snapshot.val()
            setBio(data)
        })
    }, [])

    const saveBio = (e) => {
        setEditable(!editable)
        if(e.target.textContent === 'Save Bio'){
            console.log("Bio is being saved")
            firebase.user(user.uid).child('/').update({
                bio: bio
            })
        }
    }
    return (
        <Wrapper>
            <h2>Bio</h2>
            <div>
                {editable ? 
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} cols="35" rows="5">
                    </textarea>
                    : 
                    <p>
                        {bio}
                    </p>
                }
                
            </div>
            <GenericVestBtn 
            pad='0px' 
            border='1px solid var(--clr-primary__brighter)'
            br='10px'
            bg='none'
            color='black'
            onClick={(e) => saveBio(e)}
            >
                {editable ? 'Save Bio' : 'Edit Bio'}
            </GenericVestBtn>
        </Wrapper>
    )
}

export default ProfileBio
