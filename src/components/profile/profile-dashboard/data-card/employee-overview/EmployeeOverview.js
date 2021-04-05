import React, { useState, useEffect, useContext } from 'react';
import EmployeeOverviewWrapper from './EmployeeOverviewElements';
import { FirebaseContext } from '../../../../firebase/context';

import { setUsers } from '../../../../../redux/actions';
import { useDispatch } from 'react-redux';

const TotalCompUser = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);
    const dispatch = useDispatch();

    const [totalOrgCurrency, setTotalOrgCurrency] = useState(0);
    const [orgDataState, setOrgDataState] = useState([]);

    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        setDidMount(true);

        let orgData = [];

        firebase
            .organization(user.organization)
            .child('/users')
            .on('value', (snapshot) => {
                let users = snapshot.val();
                if (!users) return;

                for (const key in users) {
                    orgData.push({ ...users[key] });
                }
                setOrgDataState(orgData);
                dispatch(setUsers(orgData));
            });
        return () => {
            setDidMount(false);
        };
    }, [didMount, firebase, user.organization]);
    // (userCash / currentCompanyCash) * 100;
    return (
        <EmployeeOverviewWrapper>
            <h1>Employees</h1>
            <table>
                <tr>
                    <th>Username ▾</th>
                    <th>Available cash ▾</th>
                    <th>Change ▾</th>
                    <th>Role ▾</th>
                </tr>
                {orgDataState.map((item, index) => {
                    return (
                        <tr>
                            <td>
                                <img src={item.picture.profile_pic} />
                                {item.username}
                            </td>
                            <td>{item.currency.currency} $</td>
                            <td>
                                {(
                                    ((item.currency.currency - 100000) /
                                        100000) *
                                    100
                                ).toFixed(2)}
                                %
                            </td>
                            <td>
                                {item.roles.EMPLOYEE
                                    ? item.roles.EMPLOYEE.toLowerCase()
                                    : item.roles.ADMIN.toLowerCase()}
                            </td>
                        </tr>
                    );
                })}
            </table>
        </EmployeeOverviewWrapper>
    );
};

export default TotalCompUser;
