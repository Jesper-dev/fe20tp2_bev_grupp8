import React, { useContext, useEffect, useState } from 'react';

import AddEmployee from './admin/AddEmployee'

import { useDispatch, useSelector } from 'react-redux'
import { setOrganizationData } from '../../../redux/actions'

import { FirebaseContext } from '../../firebase/context';

const ProfileDashboard = () => {
    const dispatch = useDispatch()
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const OrganizationData = useSelector(state => state.OrganizationData)

    const [admin, setAdmin] = useState(false);
    const [employee, setEmployee] = useState(false);

    let OrgData = [];
    let data = '';
    let OrgDataFirebase;

    useEffect(() => {
        const companyData = firebase.db.ref('organizations/' + user.organization + '/users');
        companyData.on('value', (snapshot) => {
            OrgDataFirebase = snapshot.val();
            if (!OrgDataFirebase) return;

            for (const key in OrgDataFirebase) {
                OrgData.push({ ...OrgDataFirebase[key] });
            }

            dispatch(setOrganizationData(OrgData))
         /*       for (const [key, value] of Object.entries(OrgDataFirebase)) {
                   console.log(value.organization)
               } */
        });

        const isAdmin = firebase.db.ref('users/' + user.uid + '/roles');
            isAdmin.on('value', (snapshot) => {
            data = snapshot.val();
            if (!data) return;

            setAdmin(data.ADMIN === 'ADMIN' ? true : false);
            setEmployee(data.EMPLOYEE === 'EMPLOYEE' ? true : false);
        });


    }, []);

    return (
        <>
            {admin ? <AddEmployee /> : ''}

            {admin || employee ? (
                <h1>
                    {!OrganizationData[0] ? '' : OrganizationData[0].organization}
                </h1>
            ) : (
                <p>I'm Not ADMIN!</p>
            )}
        </>
    );
};

export default ProfileDashboard;
