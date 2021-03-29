import React from 'react'
import { NavLink, Link } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';

import { NavbarLeftElement } from './NavbarLeftElements'
import { AuthUserContext } from '../../session';

import LogoNav from '../../svgs/LogoLets'


const NavbarLeft = ({ authUser }) => {
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
};


// authUser.roles[ROLES.ADMIN]
const NavigationAuth = () => (
    <NavbarLeftElement>
        <ul>
            <li>
                <Link to={ROUTES.HOME} className="logo-link">
                    <LogoNav className="logo-left-nav" />
                </Link>
            </li>
            <li>
                <NavLink to={ROUTES.HOME}>
                    <i className="fas fa-home"></i>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.DISCOVER}>
                    <i className="fas fa-search-dollar"></i>
                    Discover
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SOCIAL}>
                    <i className="fas fa-users"></i>
                    Social
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.PROFILE}>
                    <i className="fas fa-user-circle"></i>
                    Profile
                </NavLink>
            </li>
        </ul>
    </NavbarLeftElement>
);
const NavigationNonAuth = () => (
    <NavbarLeftElement>
        <ul>
            <li>
                <Link to={ROUTES.HOME} className="logo-link">
                    <LogoNav className="logo-left-nav" />
                </Link>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    <i className="fas fa-home"></i>Home
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    <i className="fas fa-search-dollar"></i>Discover
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    <i className="fas fa-users"></i>Social
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    <i className="fas fa-user-circle"></i>Profile
                </NavLink>
            </li>
        </ul>
    </NavbarLeftElement>
);

export default NavbarLeft
