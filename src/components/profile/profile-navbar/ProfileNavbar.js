import React from 'react'
import { ProfileNavbarElement } from "./ProfileNavbarElements";
import { NavLink, useRouteMatch } from 'react-router-dom';
import * as ROUTES from "../../../constants/routes";
import SignOutButton from '../../sign-out/SignOut';
import * as ROLES from '../../../constants/roles';

import { AuthUserContext } from '../../session';
import { useDispatch } from 'react-redux';


const ProfileNavbar = () => {
    let { path, url } = useRouteMatch();

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
    <ProfileNavbarElement>
        <ul>
            <li>
                <NavLink exact to={ROUTES.PORTFOLIO}>
                    Portfolio
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.POSTS}>
                    Posts
                </NavLink>
            </li>
            <li>
                <NavLink  to={ROUTES.LIKES}>
                    Likes
                </NavLink>
            </li>
        </ul>
    </ProfileNavbarElement>
    </>
);

const NavigationNonAuth = () => (
    <ProfileNavbarElement>
        <ul>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    Portfolio
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    Posts
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    Likes
                </NavLink>
            </li>
        </ul>
    </ProfileNavbarElement>
);

export default ProfileNavbar
