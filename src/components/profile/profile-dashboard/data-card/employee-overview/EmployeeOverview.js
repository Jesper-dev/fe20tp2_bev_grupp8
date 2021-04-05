import React from 'react';
import EmployeeOverviewWrapper from './EmployeeOverviewElements';

import { useSelector } from 'react-redux';

const TotalCompUser = () => {
    const OrganizationData = useSelector((state) => state.OrganizationData);

    /*     const CalcChangePercent = (item) => {
        (((item.currency.currency - 100000) / 100000) * 100).toFixed(2);
    }; */

    return (
        <EmployeeOverviewWrapper>
            <h2>Employees</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username ▾</th>
                        <th>Available cash ▾</th>
                        <th>Change ▾</th>
                        <th>Role ▾</th>
                    </tr>
                </thead>
                {OrganizationData.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                <img src={item.picture.profile_pic} />
                                {item.username}
                                {item.roles.ADMIN ? (
                                    <i
                                        style={{ color: 'grey' }}
                                        className="fas fa-user-shield"
                                    ></i>
                                ) : null}
                            </td>
                            <td>{item.currency.currency} $</td>
                            <td
                                style={
                                    (
                                        ((item.currency.currency - 100000) /
                                            100000) *
                                        100
                                    ).toFixed(2) > -0.1
                                        ? { color: 'var(--lighter-green)' }
                                        : { color: 'var(--lighter-red)' }
                                }
                            >
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
