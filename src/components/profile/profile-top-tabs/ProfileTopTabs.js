import React from 'react'
import { TabBarElement } from "./ProfileTopTabsElements";
import { NavLink } from 'react-router-dom';
import * as ROUTES from "../../../constants/routes";
// import SignOutButton from '../../sign-out/SignOut';
// import * as ROLES from '../../../constants/roles';

import { AuthUserContext } from '../../session';
// import { useDispatch } from 'react-redux';


const ProfileNavbar = () => {
/*     let { path, url } = useRouteMatch(); */

    return (

        <AuthUserContext.Consumer>
            {(authUser) =>
                authUser ? (
                    <NavigationAuth authUser={authUser} />
                ) : (
                    <NavigationNonAuth />
                )
            }
        </AuthUserContext.Consumer>
    );


}

const NavigationAuth = () => (
    <>
    <TabBarElement>
        <ul>
            <li>
                <NavLink exact to={ROUTES.PORTFOLIO}>
                    Portfolio
                </NavLink>
            </li>
            <li>
                <NavLink  to={ROUTES.PROFILE_WALL}>
                    Wall
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.DASHBOARD}>
                    Dashboard
                </NavLink>
            </li>
        </ul>
    </TabBarElement>
    </>
);

const NavigationNonAuth = () => (
    <TabBarElement>
        <ul>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    Portfolio
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    Wall
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    Dashboard
                </NavLink>
            </li>
        </ul>
    </TabBarElement>
);

export default ProfileNavbar
