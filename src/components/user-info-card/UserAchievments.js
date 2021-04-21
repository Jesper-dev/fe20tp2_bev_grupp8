import React, {useState, useEffect} from 'react'

const UserAchievments = ({userData}) => {
    const [millionaire, setMillionaire] = useState(false);
    const [bitcoin, setBitcoin] = useState(false);

    useEffect(() => {
        if(!userData.achievments) return;
        setMillionaire(userData.achievments.millionaire.show)
        setBitcoin(userData.achievments.bitcoin.show)
    }, [])

    return (

        <div className="achievments-wrapper">

            {millionaire ? (
                <p>Selfmade Millionaire</p>
            ) : (
                ''
            )}
            {bitcoin ? (
                <p>Bitcoin Enthusiast</p>
            ) : (
                ''
            )}

        </div>

    )
}

export default UserAchievments
