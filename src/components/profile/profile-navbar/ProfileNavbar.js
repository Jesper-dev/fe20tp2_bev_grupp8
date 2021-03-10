import React from 'react'
import { ProfileNavbarElement } from "./ProfileNavbarElements";
import { NavLink, useRouteMatch } from 'react-router-dom';
import * as ROUTES from "../../../constants/routes";
import { useDispatch } from 'react-redux';


const ProfileNavbar = () => {
    let { path, url } = useRouteMatch();



    return (
        <>
        <ProfileNavbarElement>
            <ul>
                <li>
					<NavLink to={ROUTES.PORTFOLIO}>
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
    )
}

export default ProfileNavbar
