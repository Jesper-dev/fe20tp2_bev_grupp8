import React, { useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase/context'
// import firebase from 'firebase'
import UserCard from './UserCard'

import SocialPost from './SocialPost';
import SocialFeed from './SocialFeed'
import SearchBar from '../shared/search-bar/SearchBar'

import { setUsers } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import ContentWrapper from "../shared/wrappers/ContentWrapper";
import { MainWrapper } from "./SocialPageElements"

import { withAuthorization } from '../session/index';
let usersArray = []
const SocialPage = () => {
    const dispatch = useDispatch();
    const filteredUsers = useSelector((state) => state.FilteredUsers)
	const firebase = useContext(FirebaseContext);
    useEffect(() => {

        usersArray = []
        //* Gets a list of users in our database
        const users = firebase.users();
        users.on('value', (snapshot) => {
            const data = snapshot.val();
            for (const key in data) {
                usersArray.push({ ...data[key] });
            }
            dispatch(setUsers(usersArray))
        });

    }, [dispatch, firebase]) //changed!

    return (
        <ContentWrapper>
            <MainWrapper>
                    <SearchBar />
                    {filteredUsers.length > 0 ? filteredUsers.map((item, index) => {
                        return (
                            <UserCard
                                key={index}
                                img={item.picture ? item.picture.profile_pic : "img"}
                                username={item.username}
                                total={item.currency ? item.currency.currency : 20}
                            />
                        )
                    }) : usersArray = []}
                    <>
                        <SocialPost />
                        <SocialFeed />
                    </>
                </MainWrapper>
        </ContentWrapper>
    );
}

const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(SocialPage); //check to see if you are signed in
