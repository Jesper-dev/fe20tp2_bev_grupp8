import React, { useContext, useEffect, useState } from 'react';

import AddEmployee from './admin/AddEmployee';
import TotalCompValue from './data-card/total-comp-value/TotalCompValue';
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
			<div class="quick-cards-wrapper">
				<div class="quick-info-cards">
					<article class="total">
						<h1>Total assets</h1>
						<h2>192 173$</h2>
					</article>
					<article class="change">
						<h1>Change</h1>
						<h2>21.4%</h2>
					</article>
					<article class="profits">
						<h1>Profits</h1>
						<h2>5 614$</h2>
					</article>
				</div>

				<article class="featured">
					<h1>Employee of the week</h1>
					<p>Dave is the best, yay!</p>
				</article>
			</div>
			<article class="employees">
				<h3>Employees</h3>
				<table>
					<tr>
						<th>Firstname ▾</th>
						<th>Lastname ▾</th>
						<th>Age ▾</th>
						<th>Gender ▾</th>
					</tr>
					<tr>
						<td>Eve</td>
						<td>Jackson</td>
						<td>94</td>
						<td>Female</td>
					</tr>
					<tr>
						<td>Peter</td>
						<td>Cummings</td>
						<td>63</td>
						<td>Male</td>
					</tr>
					<tr>
						<td>Bobby</td>
						<td>Buttocks</td>
						<td>74</td>
						<td>Male</td>
					</tr>
					<tr>
						<td>Jackie</td>
						<td>Donger</td>
						<td>51</td>
						<td>Male</td>
					</tr>
				</table>
			</article>
        </Wrapper>
    );
};

export default ProfileDashboard;
