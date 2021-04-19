import React, { useContext, useEffect, useState } from 'react';
import { AchievmentsCardWrapper } from './ProfileAchievmentsElements';
import { FirebaseContext } from '../../firebase/context';

import MillionareSvg from '../../svgs/achievements/MillionareSvg';
import MoneyBagSvg from '../../svgs/achievements/MoneyBagSvg';

const AchievmentsCard = ({ icon, name, desc, done, id, show, svg, reward }) => {
    const [checked, setChecked] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [ach, setAch] = useState(false);
    const userData = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const toast = document.querySelector('.toast');
    useEffect(() => {
        firebase
            .user(userData.uid)
            .child(`/achievments/${id}`)
            .on('value', (snapshot) => {
                const data = snapshot.val();
                setShowCard(data);
                if (data.show === true) {
                    setChecked(true);
                } else {
                    setChecked(false)
                }
            });
/*         console.log(name); */

        firebase
            .user(userData.uid)
            .child('/achievments')
            .on('value', (snapshot) => {
                const data = snapshot.val();
                let list = [];
     /*            console.log(data); */
                for (const key in data) {
                    list.push(data[key]);
                }
                setAch(list);
            });
    }, [checked]);
    const onChangeFunc = (arr, id) => {
        let showAch = checked;
        disableAchs(arr);
        setChecked(!checked);

        firebase.user(userData.uid).child(`/achievments/${id}`).update({
            show: !checked,
        });
    };

    const disableAchs = (arr) => {
        setChecked(showCard.show)
        arr.forEach((item) => {
            firebase
                .user(userData.uid)
                .child(`/achievments/${item.id}`)
                .update({
                    show: false,
                });
        });
    };

    return (
        <>
            <AchievmentsCardWrapper show={show} done={done} checked={checked}>
                <MillionareSvg />
                {/*         <img>{svg}</img> */}
                <section>
                    <section className="text-wrapper">
                        <span>{name}</span>
                        <span>{desc}</span>
                    </section>
                    <section className="text-wrapper">
                        <span>Reward</span>
                        <span>{reward}</span>
                    </section>
                </section>

                <button
                    className="svg-btn"
                    onClick={() => onChangeFunc(ach, id)}
                >
                    <MoneyBagSvg className="moneybag" />
                </button>
               {/*     <input
                    type="checkbox"
                    checked={showCard.show}
                    onClick={() => onChangeFunc(ach, id)}
                /> */}
            </AchievmentsCardWrapper>
        </>
    );
};

export default AchievmentsCard;
