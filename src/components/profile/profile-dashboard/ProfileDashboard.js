import React, { useContext, useEffect, useState } from 'react';

import AddEmployee from './admin/AddEmployee'
import TotalCompValue from './data-card/total-comp-value/TotalCompValue'
import MostFollowedStocks from './data-card/most-followed-stocks/MostFollowedStocks'

import { useDispatch, useSelector } from 'react-redux'
import { setOrganizationData } from '../../../redux/actions'

import { FirebaseContext } from '../../firebase/context';

import { Wrapper } from './ProfileDashboardElements'

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
        <Wrapper>
            {admin ? <AddEmployee /> : ''}
            {admin || employee ? (
                <h2>
                    {!OrganizationData[0] ? '' : OrganizationData[0].organization}
                </h2>
            ) : (
                <p>Not part of a organization</p>
            )}

            <TotalCompValue />
            <MostFollowedStocks />
        </Wrapper>
    );
};

export default ProfileDashboard;
