import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import {
    Switch,
    Route
  } from "react-router-dom";

/* import ProfileImg from './profile-img/ProfileImg' */
import NavbarProfile from './profile-navbar/ProfileNavbar'
import ProfilePortfolio from './profile-portfolio/ProfilePortfolio'
import ProfilePosts from './profile-posts/ProfilePosts'
import ProfileLikes from './profile-likes/ProfileLikes'
import SignOutButton from '../sign-out/SignOut';

const Profile = () => {
    const history = useHistory();



    const [navpath, setNavPath] = useState('portfolio')

    const redirect = () => {
        console.log('REDIRECT ME');
        history.push('/');
    };

    const CheckWichNavTab = () => {
        if(navpath == 'portfolio'){
            return   <ProfilePortfolio />
        } else if(navpath == 'posts') {
            return <ProfilePosts />
        } else if(navpath == 'likes'){
            return  <ProfileLikes />
        }
    }


    let tab = CheckWichNavTab()


    return (
        <>
          {/*   <ProfileImg /> */}
            <SignOutButton />
            <NavbarProfile />


        {tab}

        </>
    );
};

export default Profile;
