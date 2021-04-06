import React, { useContext, useEffect, useState } from 'react';

// import AddEmployee from './admin/AddEmployee';
import CompanyOverview from './data-card/company-overview/CompanyOverview';
import EmployeeOverview from './data-card/employee-overview/EmployeeOverview';
import FeaturedEmployee from './data-card/featured-employee/FeaturedEmployee';
import MostFollowedStocks from './data-card/most-followed-stocks/MostFollowedStocks';
/* import MostFollowedCrypto from './data-card/most-followed-crypto/MostFollowedCrypto'; */

import BarChartCard from './data-card/dashboard-chart-card/DashboardChartCard';
import RecentlyBoughtSold from './data-card/recently-sold-bought/RecentlyBoughtSold';
/* import BoughtStocks from './data-card/bought-stocks/BoughtStocks' */

import { useDispatch, useSelector } from 'react-redux';
import { setOrganizationData } from '../../../redux/actions';

import { FirebaseContext } from '../../firebase/context';

import { Wrapper, SectionWrapper } from './ProfileDashboardElements';

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
            <SectionWrapper>
                <h1>
                    Weekly report <span>▾</span>
                </h1>
                <Wrapper>
                    <div className="quick-cards-wrapper">
                        <CompanyOverview />
                        <FeaturedEmployee />
                    </div>
                    <EmployeeOverview />
                </Wrapper>
            </SectionWrapper>
            <SectionWrapper>
                <h1>
                    Most followed <span>Stocks ▾</span>
                </h1>
                <Wrapper>
                    <BarChartCard />
                    <RecentlyBoughtSold />
                </Wrapper>
            </SectionWrapper>
        </>
    );
};

export default ProfileDashboard;
