import React, { useState, useEffect } from 'react';
import axios from "axios"
// import { FirebaseContext } from '../firebase/context'
import firebase from 'firebase'
import UserCard from './UserCard'

import SearchBar from '../shared/search-bar/SearchBar'
import { UserList } from '../admin/admin'

import { filterUsers, setUsers } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { withAuthorization, AuthUserContext } from '../session/index';
import {UserWrapper} from './SocialPageElements'
let usersArray = []
const SocialPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.Users)
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



        // axios.get('https://grupp8-c364e-default-rtdb.firebaseio.com/users.json')
        //     .then(res => {
        //         for(const key in res.data) {
        //             usersArray.push({...res.data[key]})
        //         }
        //     })
        //     .catch(err => console.log(err))

        //*Function: write to user in databse???
        // function writeUserData(userId, name, email, imageUrl) {
        //     firebase.database().ref('users/' + userId).set({
        //       username: name,
        //       email: email,
        //       profile_picture : imageUrl
        //     });
        //   }

        //TODO Gör så att bilden sparas i databasen. Få ut bilden och annat i UserWrapper, kanske göra en usercard component?
    }, [])

    return (

        <>
            <SearchBar />
            {filteredUsers.map((item, index) => {
                return (
                    <UserCard key={index} img={item.picture.profile_pic} username={item.username}/>
                )
            })}
        </>


    );
}

const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(SocialPage); //check to see if you are signed in
