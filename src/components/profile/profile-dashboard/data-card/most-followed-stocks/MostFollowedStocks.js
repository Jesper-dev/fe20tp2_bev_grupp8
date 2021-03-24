import React, {useEffect, useContext, useState} from 'react'

import { FirebaseContext } from '../../../../firebase/context';

const MostFollowedStocks = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext)
    const [orgDataState, setOrgDataState] = useState([])
  /*   const [maxElState, setMaxElState] = useState([]) */
    const [mostFollowedTopState, setMostFollowedTopState] = useState([])

    let orgFollowArray = [];
    let sortedArray = []
    let orgData = []
    let mostFollowedTop = []
    let maxElState = []


  const findMostFrequent = (arr) => {
      return arr
         .reduce((acc, cur, ind, arr) => {
              if (arr.indexOf(cur) === ind) {
                return [...acc, [cur, 1]];
              } else {
                  acc[acc.indexOf(acc.find((e) => e[0] === cur))] = [
                    cur,
                    acc[acc.indexOf(acc.find((e) => e[0] === cur))][1] + 1,
                ];
                maxElState = acc
                return acc;
              }
          }, [])
          .sort((a, b) => b[1] - a[1])
          .filter((cur, ind, arr) => cur[1] === arr[0][1])
          .map((cur) => cur[0]);
        }

    useEffect(() => {
        const orgFollowedStocks = firebase.db.ref('organizations/' + user.organization + '/users');
            orgFollowedStocks.on('value', (snapshot) => {
            const followedStocks = snapshot.val();
            if (!followedStocks) return;
            for (const key in followedStocks) {
                orgData.push({ ...followedStocks[key] });
            }
            makeArray(orgData);
        });
    }, [])

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
        findMostFrequent(orgFollowArray)
        makeFinalArr(maxElState)
    }

    const makeFinalArr = (arr) => {
        arr.forEach((item) => {
            const obj = {
                name: item[0],
                count: item[1]
            }
            mostFollowedTop.push(obj)
        })
        setMostFollowedTopState(mostFollowedTop)
    }
    return (
        <div>
            <h3>Most Followed Stocks</h3>
            {mostFollowedTopState.map((item, index) => {
                return (
                    <p key={index}>
                        {item.name} - {item.count} times
                    </p>
                );
            })}
        </div>
    );
}

export default MostFollowedStocks
