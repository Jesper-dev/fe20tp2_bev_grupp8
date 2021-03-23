import React, {useEffect, useContext, useState} from 'react'

import { FirebaseContext } from '../../../../firebase/context';

const MostFollowedStocks = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext)
    const [orgDataState, setOrgDataState] = useState([])

    let orgFollowArray = [];
    let sortedArray = []
    let orgData = []

    //*This makes the array with all the stocks being followed in the organization
    const makeArray = (arr) => {
        let j = 0;
        let i = 0;
        while(j < arr.length) {
            if(arr[j].followingStocks.array[i] === undefined){
                i = 0;
                j++
            } else {
                orgFollowArray.push(arr[j].followingStocks.array[i].symbol)
                i++;
            }
        }
        setOrgDataState(orgFollowArray)
        sortArray(orgDataState)
    }

    //*This sorts the array that was made into the top three followed stocks (the three stocks that have the most follows)
    const sortArray = (arr) => {
        let j = 0;
        let i = 0;
        //*This while loop checks if arr[x] is equal to arr[y]
        while(j < arr.length) {
            if(arr[j] == arr[i]){
                if(arr[i] == undefined){
                    console.log("Det är undefined")
                    i += 1;
                } else {
                    console.log(arr[j] + ' ' + arr[i] + " Det är lika")

                    sortedArray.push(arr[i])
                    i += 1;
                }
            } else if(arr[j] !== arr[i]) {
                if(arr[i] == undefined){
                    console.log("Det är undefined")
                    i += 1;
                } else {
                    console.log(arr[j] + ' ' + arr[i] + " Det är inte lika")
                    i += 1;
                }
            }

            if(arr[i] == undefined) {
                j += 1;
                i = 0;
            }
        }
    }

    //*Vi kanske inte ens måste göra allting över, kanske räcker med någonting annat
    useEffect(() => {
        const runThis = async () => {
            const orgFollowedStocks = firebase.db.ref('organizations/' + user.organization + '/users');
            await orgFollowedStocks.on('value', (snapshot) => {
                const followedStocks = snapshot.val();
                if (!followedStocks) return;
                console.log("Efter return")
                for (const key in followedStocks) {
                    orgData.push({ ...followedStocks[key] });
                }
                //TODO Kolla hur mycket en viss value finns orgData, så att man får fram top tre
            });

        }
        runThis()

        console.log("Hit kommer vi")
        makeArray(orgData)
        return () => {
            console.log("Vafan")
        }
    }, [])



    return (
        <div>
            <h3>Most Followed Stocks</h3>
            {orgDataState.map((item, index) => {
                return <p key={index}>{item}</p>
            })}
        </div>
    )
}

export default MostFollowedStocks
