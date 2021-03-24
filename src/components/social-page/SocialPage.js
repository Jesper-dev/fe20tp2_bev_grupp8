import React, { useEffect } from 'react';
// import { FirebaseContext } from '../firebase/context'
import firebase from 'firebase'
import UserCard from './UserCard'

import SocialPost from './SocialPost';
import SearchBar from '../shared/search-bar/SearchBar'

import { setUsers } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { UserWrapper } from "./SocialPageElements"

import { withAuthorization } from '../session/index';
let usersArray = []
const SocialPage = () => {
    const dispatch = useDispatch();
    const filteredUsers = useSelector((state) => state.FilteredUsers)
    useEffect(() => {

        usersArray = []
        //* Gets a list of users in our database
        const users = firebase.database().ref('users');
        users.on('value', (snapshot) => {
            const data = snapshot.val();
            for (const key in data) {
                usersArray.push({ ...data[key] });
            }
            dispatch(setUsers(usersArray))
        });

    }, [dispatch])

    return (

        <UserWrapper>
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
            }) : <SocialPost />}

        </UserWrapper>



    );
}

const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(SocialPage); //check to see if you are signed in
