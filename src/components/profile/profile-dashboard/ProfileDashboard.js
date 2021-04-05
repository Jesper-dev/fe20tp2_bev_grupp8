import React, { useContext, useEffect, useState } from 'react';

import AddEmployee from './admin/AddEmployee';
import CompanyOverview from './data-card/company-overview/CompanyOverview';
import EmployeeOverview from './data-card/employee-overview/EmployeeOverview';
import FeaturedEmployee from './data-card/featured-employee/FeaturedEmployee';
import MostFollowedStocks from './data-card/most-followed-stocks/MostFollowedStocks';
/* import MostFollowedCrypto from './data-card/most-followed-crypto/MostFollowedCrypto'; */

import BarChartCard from './data-card/dashboard-chart-card/DashboardChartCard';
import RecentlyBought from './data-card/recently-bought/RecentlyBought';
/* import BoughtStocks from './data-card/bought-stocks/BoughtStocks' */

import { useDispatch, useSelector } from 'react-redux';
import { setOrganizationData } from '../../../redux/actions';

import { FirebaseContext } from '../../firebase/context';

import { Wrapper } from './ProfileDashboardElements';
import RecentlySold from './data-card/recently-sold/RecentlySold';

const ProfileDashboard = () => {
    const dispatch = useDispatch();
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const OrganizationData = useSelector((state) => state.OrganizationData);

    const [admin, setAdmin] = useState(false);
    const [employee, setEmployee] = useState(false);
    //let OrgDataFirebase; //changed! placed in useEffect
    //let OrgData = [];
    //let data = ''; // changed!
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        setDidMount(true);
        let OrgData = [];
        let data = '';
        let OrgDataFirebase;
        const companyData = firebase.db.ref(
            'organizations/' + user.organization + '/users'
        );
        companyData.on('value', (snapshot) => {
            OrgDataFirebase = snapshot.val(); //varning!
            if (!OrgDataFirebase) return;

            for (const key in OrgDataFirebase) {
                OrgData.push({ ...OrgDataFirebase[key] });
            }

            dispatch(setOrganizationData(OrgData));
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
        return () => {
            setDidMount(false);
        };
    }, [didMount, dispatch, firebase.db, user.organization, user.uid]);
    //OrgData, dispatch, firebase.db, user.organization, user.uid
    //*Kanske skicka ned olika arrayer som props ned till components och inte kalla på de i components själva

    return (
        <>
            <h1 style={{ fontSize: '1.25rem', margin: '2rem 0 -0.75rem 2rem' }}>
                Weekly report
                <span style={{ color: 'grey', marginLeft: '0.25rem' }}>▾</span>
            </h1>
            <Wrapper>
                {/*             {admin ? <AddEmployee /> : ''}
                {admin || employee ? (
                    <>
                        <h2>
                            {!OrganizationData[0]
                                ? ''
                                : OrganizationData[0].organization}
                        </h2>
                        <TotalCompValue />
                        <BarChartCard />
                        <RecentlyBought />
                        <RecentlySold />
                    </>
                ) : (
                    <>
                        <h2>Not part of a organization</h2>
                        <span className="join-today">Join today...</span>
                    </>
                )} */}
                <div className="quick-cards-wrapper">
                    <CompanyOverview />
                    <FeaturedEmployee />
                </div>
                <EmployeeOverview />
            </Wrapper>
            <h1 style={{ fontSize: '1.25rem', margin: '2rem 0 1.25rem 2rem' }}>
                Most followed{' '}
                <span
                    style={{ color: 'grey', textDecorationLine: 'underline' }}
                >
                    Stocks
                </span>
                <span style={{ color: 'grey' }}>▾</span>
            </h1>
            <BarChartCard />
            <RecentlyBought />
            <RecentlySold />
        </>
    );
};

export default ProfileDashboard;
