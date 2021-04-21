import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';

import { FirebaseContext } from '../../firebase';

import { NavbarLeftElement } from './NavbarLeftElements';
import { AuthUserContext } from '../../session';

import LogoNav from '../../svgs/LogoLets';

const NavbarLeft = ({ authUser }) => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));
    const [logo, setLogo] = useState('');

    const checkIfOrganizationLogo = () => {
        if (user === null) return;
        if (user.organization) {
            firebase
                .organization(user.organization)
                .child('/Logo')
                .on('value', (snapshot) => {
                    const data = snapshot.val();
                    setLogo(data.Logo);
                });
        }
    };

    useEffect(() => {
        checkIfOrganizationLogo();
    }, [user]);

    return (
        <AuthUserContext.Consumer>
            {(authUser) =>
                authUser ? (
                    <NavigationAuth authUser={authUser} logo={logo} />
                ) : (
                    <NavigationNonAuth />
                )
            }
        </AuthUserContext.Consumer>
    );
};

// authUser.roles[ROLES.ADMIN]
const NavigationAuth = ({ logo }) => (
    <NavbarLeftElement>
        <ul>
            <li>
                <Link to={ROUTES.HOME} className="logo-link">
                    {logo ? (
                        <img src={logo} />
                    ) : (
                        <LogoNav className="logo-left-nav" />
                    )}
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

export default NavbarLeft;
