import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

import PostTabBar from '../PostTabBar';
import UserPosts from "./user-posts/UserPosts";
import LikedPosts from "./liked-posts/LikedPosts";
import ProfileBio from './profile-bio/ProfileBio'
import { PostsWrapper } from './ProfileWallElements'
import {
    HeaderWrapper,
    MainWrapper,
} from './../ProfileElements';

const ProfileWall = () => {

    const tabs = [
        {
            label: 'Posts',
            link: ROUTES.PROFILE_POSTS,
        },
        {
            label: 'Liked',
            link: ROUTES.PROFILE_LIKED,
        },
    ];


    return(
    <>
        <ProfileBio />


      {/*   <ul>
                <li>
        	<Link
                    exact to={ROUTES.PROFILE_POSTS}
                     component={UserPosts}
            > Posts</Link>
            </li>
            <li>
        	<Link
                    exact to={ROUTES.PROFILE_LIKED}
                     component={LikedPosts}
                    > Liked</Link>
            </li>
        </ul>  */}

   {/*  <MainWrapper> */}
            {/* <PostTabBar tabs={tabs} /> */}

           {/* <Switch> */}

                <PostsWrapper>
               {/*  <Route exact path="/">
                <UserPosts />
                </Route>   */}
                  {/* </PostsWrapper> */}
                {/* <PostsWrapper> */}
               <Route exact
                    path={ROUTES.PROFILE_POSTS}
                    /* component={UserPosts} */
                    >
                        <UserPosts />
                </Route>
                {/* </PostsWrapper> */}
                {/* <PostsWrapper> */}
                <Route exact path={ROUTES.PROFILE_POSTS}/*  component={LikedPosts} */
                >
                  <LikedPosts />
                </Route>

                </PostsWrapper>

           {/*  </Switch> */}
        {/* </MainWrapper> */}

            {/* <UserPosts /> */}
            {/* <LikedPosts /> */}


    </>
    );
};

export default ProfileWall;
