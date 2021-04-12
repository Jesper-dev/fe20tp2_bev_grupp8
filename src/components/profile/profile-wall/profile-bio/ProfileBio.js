import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../../firebase/context';

import { Wrapper } from './ProfileBioElements';
import { GenericVestBtn } from '../../../shared/button/ButtonElements';

const ProfileBio = () => {
    const [bio, setBio] = useState('');
    const [editable, setEditable] = useState(false);
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        firebase
            .user(user.uid)
            .child('/bio')
            .once('value', (snapshot) => {
                const data = snapshot.val();
                setBio(data);
            });
    }, []);

    const saveBio = (e) => {
        setEditable(!editable);
        if (e.target.textContent === ' Save Bio') {
            console.log('Bio is being saved');
            firebase.user(user.uid).child('/').update({
                bio: bio,
            });
        }
    };
    return (
        <Wrapper>
            <div>
                <h2>Bio</h2>
                <GenericVestBtn
                    pad="4px"
                    border="none"
                    /*     border="1px solid var(--clr-primary__brighter)" */
                    fz="14px"
                    br="10px"
                    bg="none"
                    co="var(--clr-primary)"
                    hovbg="#E8E8E8"
                    wid="90px !important"
                    hei="35px !important"
                    onClick={(e) => saveBio(e)}
                >
                    {editable ? (
                        <div>
                            <i className="fas fa-save"></i> Save Bio
                        </div>
                    ) : (
                        <div>
                            <i className="fas fa-edit"></i> Edit bio
                        </div>
                    )}
                </GenericVestBtn>
            </div>
            <div>
                {editable ? (
                    <textarea
                        value={bio}
                        placeholder="Write your biography..."
                        onChange={(e) => setBio(e.target.value)}
                        cols="35"
                        rows="5"
                    ></textarea>
                ) : (
                    <p>{bio}</p>
                )}
            </div>
        </Wrapper>
    );
};

export default ProfileBio;
