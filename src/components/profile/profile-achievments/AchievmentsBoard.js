import React, {useState, useEffect, useContext} from 'react'
import { FirebaseContext } from '../../firebase/context';

const AchievmentsBoard = () => {
    const firebase = useContext(FirebaseContext);
    const [millionaire, setMillionaire] = useState(false);
    const [bitcoin, setBitcoin] = useState(false);
    const userData = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        firebase.user(userData.uid).child('/achievments').once('value', (snapshot) => {
            const data = snapshot.val()
            setMillionaire(data.millionaire.show)
            setBitcoin(data.bitcoin.show)
        })
    }, [])

    return (

        <div className="achievments-wrapper">
            <p>
            {millionaire ? (
                'Selfmade Millionaire'
            ) : (
                ''
            )}
                </p>
                    <p>
                        {bitcoin ? (
                            <p>Bitcoin Enthusiast</p>
                        ) : (
                            ''
                        )}
                </p>
        </div>

    )
}

export default AchievmentsBoard
