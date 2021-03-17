import React, { useEffect } from 'react';
// import { FirebaseContext } from '../firebase/context'
import firebase from 'firebase'
import UserCard from './UserCard'

import SocialPost from './SocialPost';
import SearchBar from '../shared/search-bar/SearchBar'

import { filterUsers, setUsers } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { withAuthorization } from '../session/index';
let usersArray = []
const SocialPage = () => {
    const dispatch = useDispatch();
    const filteredUsers = useSelector((state) => state.FilteredUsers)
    const Currency = useSelector((state) => state.Currency);
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

        console.log(filteredUsers)

    }, [dispatch])

    return (

        <>
            <SearchBar />
            <SocialPost />
            {filteredUsers.map((item, index) => {
                return (
                    <UserCard key={index}
                        img={item.picture ? item.picture.profile_pic : "img"}
                        username={item.username}
                        total={item.currency ? item.currency.currency : 20}
                    />
                )
            })}

        </>


    );
}

const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(SocialPage); //check to see if you are signed in
