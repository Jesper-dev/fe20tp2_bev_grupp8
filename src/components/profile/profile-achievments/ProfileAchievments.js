import React, { useContext, useEffect, useState } from 'react';
import { ContentWrapper } from './ProfileAchievmentsElements';
import { FirebaseContext } from '../../firebase/context';
import AchievmentsCard from './AchievmentsCard';

import TrophySvg from '../../svgs/achievements/TrophySvg';

const ProfileAchievments = () => {
    const userData = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const [achData, setAchData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebase
            .user(userData.uid)
            .child('/achievments')
            .once('value', (snapshot) => {
                const data = snapshot.val();
                if (!data) return;
                let list = [];
                for (const key in data) {
                    list.push(data[key]);
                }
                setAchData(list);
                setLoading(false);
            });
    }, [loading]);

    console.log(achData);
    return (
        <>
            <ContentWrapper>
                <div className="topbar-wrapper">
                    <h1>Achievments</h1>
                    <TrophySvg className="trophy" />
                </div>
                <hr />
                {loading ? (
                    'loading...'
                ) : (
                    <>
                        {achData
                            ? achData.map((item, index) => {
                                  return (
                                      <AchievmentsCard
                                          key={index}
                                          name={item.name}
                                          desc={item.desc}
                                          done={item.done}
                                          id={item.id}
                                          show={item.show}
                                          reward={item.reward}
                                      />
                                  );
                              })
                            : ''}
                    </>
                )}
            </ContentWrapper>
        </>
    );
};

export default ProfileAchievments;
