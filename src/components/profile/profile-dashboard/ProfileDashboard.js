import React, { useContext, useEffect, useState } from 'react';

import AddEmployee from './admin/AddEmployee'

import { FirebaseContext } from '../../firebase/context';

const ProfileDashboard = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const [admin, setAdmin] = useState(false);
    const [employee, setEmployee] = useState(false);

    let data = '';

    useEffect(() => {
    
        const isAdmin = firebase.db.ref('users/' + user.uid + '/roles');
            isAdmin.on('value', (snapshot) => {
            data = snapshot.val();
            if (!data) return;    
            
            setAdmin(data.ADMIN === 'ADMIN' ? true : false);
            setEmployee(data.EMPLOYEE === 'EMPLOYEE' ? true : false);
        });
        
        
    
    }, []);

    //TODO Kunna adda emails som ska ha tillång till organisationen

    return (
        <>  
        {admin ? <AddEmployee /> : ''}
            {admin ? <p>I'm ADMIN</p> : <p>I'm Not ADMIN!</p>}
        </>
    )
};

export default ProfileDashboard;
